let mongoose 					= require('mongoose');
let Schema   					= mongoose.Schema;

module.exports = mongoose.model('clients', new Schema({

	client_name       			: String,
	certificate_sent 			: Boolean,
	partners		 			: [String],
	products_licenced			: [{
								     product        : String,
								     no_of_licenses : Number
								  }],
	licence_procurement_date    : Date,
	support_renewal_date 		: Date,
	status 						: String,
	primary_contact 			: [{
									name 	: String,
									email	: [String],
									phone	: [String]
								  }]	
})
);