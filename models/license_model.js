
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
module.exports = mongoose.model('licenses',new Schema({
	client_id    				:  {type: mongoose.Schema.Types.ObjectId, ref: 'clients'},
	product   					:  String,
	no_of_licenses   			:  Number,
	licence_procurement_date    :  Date,
	support_renewal_date 		:  Date,
	certificate_status          :  String,
	license_status              :  Boolean
}));