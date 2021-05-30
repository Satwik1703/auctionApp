const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const {v4 : uuidv4} = require('uuid');
const port = process.env.PORT || 3000;

//Connecting to Database
const db = require('./database.js');
db();

//Database Collections
const BuyData = require('./dataModels/buyData.js');
const OffersData = require('./dataModels/offersData.js');
const LeaderboardData = require('./dataModels/leaderboardData.js');
const UserData = require('./dataModels/userData.js');

//Creating the collections in Database
// const createUserData = require('./createData/userData.js');
// createUserData();
// const createBuyData = require('./createData/buyData.js');
// createBuyData();

//App Uses
app.use(cors());
app.use(bodyParser.json());

//Methods
app.get('/', (req, res) => {
	res.send('yoyo');
});

app.post('/login', (req, res) => {
	console.log('login request recieved');

	UserData.findOne({email: req.body.email, password: req.body.password}, function(err, docs){
		if(err || docs == null){
			res
			.status(400)
			.json("Wrong UserName/Password");
			return;
		}

		res
		.status(200)
		.json({
			userId: docs.userId,
			username: docs.username,
			email: docs.email,
			phoneNo: docs.phoneNo,
		})
	})
})

app.get('/buyData', (req, res) => {
	console.log('buyData request recieved');

	BuyData.find({$or:[{type: 'buy'}, {type: 'auction'}]}, function(err, docs){
		if(err){
			res
			.status(400)
			.json('Error in getting data');
			return;
		}
		res
		.status(200)
		.json(docs);
	});
});

app.post('/buyOffer', (req, res) => {
	console.log('buyOffer request recieved');

	OffersData.create({
		buyerId: req.body.buyerId,
		type: req.body.type,
		buyerUsername: req.body.buyerUsername,
		price: req.body.price,
		email: req.body.email,
		phoneNo: req.body.phoneNo,
		productId: req.body.productId,
		sellerUsername: req.body.sellerUsername
	})
	.then(() => {
		res
		.status(200)
		.json('Successfully submitted the offer');
	})
	.catch(err => {
		res
		.status(400)
		.json("Error in submitting the offer");
	})
})

app.post('/getOffersSubmitted', (req, res) =>{
	console.log('getOffersSubmitted request recieved');

	OffersData.find({buyerId: req.body.buyerId}, function(err, docs){
		if(err){
			res
			.status(400)
			.json("Error in getting the offers submitted by user");
			return;
		}
		res
		.status(200)
		.json(docs);
	})
})

app.get('/rentData', (req, res) => {
	console.log('rentData request recieved');

	BuyData.find({type: 'rent'}, function(err, docs){
		if(err){
			res
			.status(400)
			.json('Error in getting data');
			return;
		}
		res
		.status(200)
		.json(docs);
	});
});

app.post('/sell', (req, res) => {
	console.log('sell request recieved');

	var dateObj = new Date();
	BuyData.create({
		"id": uuidv4(),
		"type": req.body.type,
		"title": req.body.title,
		"description": req.body.description,
		"username": req.body.username,
		"price": req.body.price,
		"phone": req.body.phoneNo,
		"email": req.body.email,
		"offer_date": dateObj.getDate() +"-"+ (dateObj.getMonth()+1) +"-"+ dateObj.getFullYear(),
	})
	.then(() => {
		res
		.status(200)
		.json("Service Submitted Successfully");
	})
	.catch((err) => {
		console.log(err);
		res
		.status(400)
		.json(err)
	})
})

app.post('/myServices', (req, res) => {
	console.log('myServices request recieved');

	BuyData.find({username: req.body.username}, function(err, docs){
		if(err){
			res
			.status(400)
			.json('Error in getting data');
			return;
		}
		res
		.status(200)
		.json(docs);
	});
})

app.post('/myServices/getOffers', (req, res) => {
	console.log('getOffers request recieved');

	OffersData.find({productId: req.body.id}, function(err, docs){
		if(err){
			res
			.status(400)
			.json("Error in getting the offers submitted");
			return;
		}
		res
		.status(200)
		.json(docs);
	})
})

app.post('/myServices/deleteService', (req, res) => {
	console.log('myServices deleteService request recieved')

	BuyData.deleteMany({id: req.body.id}, function(err){
		if(err){
			res
			.status(400)
			.json('Error in Deleting Service');
			return;
		}
		OffersData.deleteMany({productId: req.body.id}, function(err){
			if(err){
				res
				.status(400)
				.json('Error in Deleting Service');
				return;
			}
		});
		res
		.status(200)
		.json("Successfully Deleted the Service");
	})
})

app.post('/myServices/acceptOffer', (req, res) => {
	console.log('myServices acceptOffer request recieved');
	var points = (typeof (req.body.price) == "string") ? (parseInt(req.body.price) * 0.1) : (req.body.price * 0.1);

	LeaderboardData.findOneAndUpdate({username: req.body.buyerUsername}, {$inc: {'points': points}}, {upsert: true, new: true}, function(err, docs){
		if(err){
			res
			.status(400)
			.json('Error in Accepting Offer');
			return;
		}
		LeaderboardData.findOneAndUpdate({username: req.body.sellerUsername}, {$inc: {'points': points}}, {upsert: true, new: true}, function(err, docs){
			if(err){
				res
				.status(400)
				.json('Error in Accepting Offer');
				return;
			}
		})
	});
	res
	.status(200)
	.json("Action Successfull");
})

app.get('/leaderboardData', (req, res) => {
	// LeaderboardData.find({}, function(err, docs){
	// 	if(err){
	// 		res
	// 		.status(400)
	// 		.json('Error in getting data');
	// 		return;
	// 	}
	// 	res
	// 	.status(200)
	// 	.json(docs);
	// });

	LeaderboardData
	.find({})
	.sort({'points': 'desc'})
	.exec(function(err, docs){
		if(err){
			res
			.status(400)
			.json('Error in getting data');
			return;
		}
		res
		.status(200)
		.json(docs);
	})
})

//App Listening
app.listen(port, () => {
	console.log(`Server is running on Port ${port}`);
})
