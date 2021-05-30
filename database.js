const mongoose = require('mongoose');

const db = () => {
	mongoose.connect(
		'mongodb+srv://satwik:Satwik@auctionapp.sbgcz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
	)
	.then(() => {
		console.log('Server Connected to Database');
	})
	.catch(err => {
		console.log('There has been an error connecting to the Database\n'+err);
	})
}

module.exports = db;
