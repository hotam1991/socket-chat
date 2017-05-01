var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	username : String,
	token : String,
	email: String,
	hashed_password: String,
	salt : String,
	temp_str:String
	
});

mongoose.connect('mongodb://localhost:27017/socketChat');
module.exports = mongoose.model('user', userSchema);
