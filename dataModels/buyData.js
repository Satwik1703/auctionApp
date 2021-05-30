const mongoose = require('mongoose');

const BuyData = new mongoose.Schema({
	id: String,
	type: String,
	title: String,
	description: String,
	username: String,
	price: Number,
	phone: Number,
	email: String,
	offer_date: String
});

module.exports = mongoose.model('BuyData', BuyData);
