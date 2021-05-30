const BuyData = require('../dataModels/buyData.js');
const {v4 : uuidv4} = require('uuid');

const createBuyData = () => {
	BuyData.create(
		{
			"id": uuidv4(),
			"type": "buy",
			"title": "Badminton Racket",
			"description": "Best racket for defensive players",
			"username": "Satwik",
			"price": "2001",
			"phone": "1234567891",
			"email": "satwik@mechyd.ac.in",
			"offer_date": "17-05-2021",
		},
		{
			"id": uuidv4(),
			"type": "auction",
			"title": "Table Tennis Racket",
			"description": "Best racket for spin offensive players",
			"username": "Abhishek",
			"price": "1640",
			"phone": "1234567892",
			"email": "abhishek@mechyd.ac.in",
			"offer_date": "17-05-2021",
		},
	)
	.then(() => {
		console.log('Buy Data created successfully ');
	})
	.catch(err => {
		console.log('Error in creating Buy Data\n'+err);
	})
}

module.exports = createBuyData;
