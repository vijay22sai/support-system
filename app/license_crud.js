const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const License    = require('../models/license_model');
const Client     = require('../models/client_model');

//function to add new license
router.post('/add',function(req,res){
        console.log(req.body);
     let license=new License({
     	client_id                     :  req.body.license.client_id,
     	product                       :  req.body.license.product,
     	no_of_licenses                :  req.body.license.no_of_licenses,
     	licence_procurement_date      :  req.body.license.lpd,
	    support_renewal_date      :  req.body.license.srd,
	    certificate_status        :  req.body.license.certificate_status
     });
     license.save( (err,data) =>{
     	console.log(data._id);
     	Client.findById(data.client_id, function(err, client_data){
     		let client_licenses = client_data.license_array;
     		if(!client_licenses)
     			client_licenses = [];
     		client_licenses.push(data._id);
     		Client.update({ _id :data.client_id},{$set : {license_array:client_licenses}},function(err,updated_data){     	
 		    	res.json(data);
     		});
     	});
     })
});

//function to get all licenses
router.get('/all', (req,res) =>{
	License.find({client_id:req.query.id},(err,data) => {
        res.send(data);
	});
	
});
//function to update license(making the license state to inactive)
router.post('/delete_license',(req,res) => {
console.log(req.body);
License.updateOne({_id:req.body._id},{$set :{"license_status": "inactive"}},function(err, data){
        console.log(data);
});
});

//function to delete license
router.get('/delete/:delete_id', function(req, res){
     License.remove({_id : req.params.delete_id} ,function(err ,data){
          console.log(data);
          res.send(data);
     });
});

//function to update license
router.post('/update_license', function(req, res){
     License.updateOne({_id:req.body._id},{$set:{
           client_id                  :  req.body.client_id,
           product                    :  req.body.product,
           no_of_licenses             :  req.body.no_of_licenses,
           licence_procurement_date   :  req.body.lpd,
           support_renewal_date       :  req.body.srd,
           certificate_status         :  req.body.certificate_status
               }
          },(err ,data) => {
     console.log(data);
     res.send(data);
     });
});
module.exports = router;


