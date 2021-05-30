const mongoose = require('mongoose');

const UserData = new mongoose.Schema({
	userId: String,
	username: String,
	phoneNo: Number,
	email: String,
	password: String
});

module.exports = mongoose.model('UserData', UserData);
