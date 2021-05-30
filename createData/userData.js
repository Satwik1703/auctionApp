const UserData = require('../dataModels/userData.js');
const {v4 : uuidv4} = require('uuid');

const createUserData = () => {
	UserData.create(
		{
			userId: uuidv4(),
			username: "Satwik",
			phoneNo: 1234567891,
			email: "satwik@mechyd.ac.in",
			password: "test1234"
		},
		{
			userId: uuidv4(),
			username: "Abhishek",
			phoneNo: 1234567892,
			email: "abhishek@mechyd.ac.in",
			password: "test1234"
		},
		{
			userId: uuidv4(),
			username: "Nikitha",
			phoneNo: 1234567893,
			email: "nikitha@mechyd.ac.in",
			password: "test1234"
		},
		{
			userId: uuidv4(),
			username: "Rithika",
			phoneNo: 1234567894,
			email: "rithika@mechyd.ac.in",
			password: "test1234"
		},
		{
			userId: uuidv4(),
			username: "Janvi",
			phoneNo: 1234567895,
			email: "janvi@mechyd.ac.in",
			password: "test1234"
		},

	)
	.then(() => {
		console.log('User Data created successfully ');
	})
	.catch(err => {
		console.log('Error in creating User Data\n'+err);
	})
}

module.exports = createUserData;
