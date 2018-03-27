const mongoose 					= require('mongoose');
const Schema   					= mongoose.Schema;

module.exports = mongoose.model('clients', new Schema({

	client_name       			: { type : String, required : true, unique : true},
	certificate_sent 			: Boolean,
	partners		 			: String,
	status 						: String,
	license_array               : [{type: mongoose.Schema.Types.ObjectId, ref: 'licenses'}],
<<<<<<< HEAD
	primary_contact_name        : String,
	primary_email               : String,
	primary_contact             : Number,
	other                       : String,
	logo						: String
=======
	primary_contact_name        :  { type : String, required : true},
	primary_email               :  { type : String, required : true},
	primary_contact             :  { type : Number, required : true},
	other                       : String
>>>>>>> 7edfd470abdffb9e5008e4dd115adecb57c2821d
})
);