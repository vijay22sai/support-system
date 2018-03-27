const mongoose 					= require('mongoose');
const Schema   					= mongoose.Schema;

module.exports = mongoose.model('clients', new Schema({

	client_name       			: String,
	certificate_sent 			: Boolean,
	partners		 			: String,
	status 						: String,
	license_array               : [{type: mongoose.Schema.Types.ObjectId, ref: 'licenses'}],
	primary_contact_name        : String,
	primary_email               : String,
	primary_contact             : Number,
	other                       : String,
	logo						: String
})
);