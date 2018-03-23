const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
module.exports = mongoose.model('users',new Schema({
				user_name  : 	String,
				user_id    :    String,
				password   : 	String,
				role       : 	String,
				email      : 	String,
				contact    : 	Number		
}));

