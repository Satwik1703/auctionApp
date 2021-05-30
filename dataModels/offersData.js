const mongoose = require('mongoose');

const OffersData = new mongoose.Schema({
	buyerId: String,
	type: String,
	buyerUsername: String,
	price: Number,
	email: String,
	phoneNo: Number,
	productId: String,
	sellerUsername: String
});

module.exports = mongoose.model('OffersData', OffersData);
