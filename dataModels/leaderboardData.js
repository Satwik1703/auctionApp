const mongoose = require('mongoose');

const LeaderboardData = new mongoose.Schema({
	username: String,
	points: Number,
});

module.exports = mongoose.model('LeaderboardData', LeaderboardData);
