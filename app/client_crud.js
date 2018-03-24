const express = require('express');
const router  = express.Router();
const bodyParser= require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json({}));

const Client   = require('../models/client_model.js');
const license  = require('../models/license_model.js');

// function to get all clients info
router.get('/clients',function(req,res){
	Client.find({}).populate('license_array').exec(function(err,data){
		res.json(data);
	});
});

//function to add new client
router.post('/add',function(req,res){

	let client = new Client({
		client_name      		    :  req.body.client_name,
		certificate_sent  			:  req.body.certificate_sent,
	    partners          			:  req.body.partners,
		status 						:  req.body.status,
		primary_email               :  req.body.primary_email,
		primary_contact             :  req.body.primary_contact,
		other                       :  req.body.other
	});
	client.save((err, data) =>{
		console.log(data);
		res.send("saved");
	}); 
});

//function to delete client
router.get('/delete/:client_id',function(req,res){
	console.log(req.params.client_id);
	Client.remove({_id:req.params.client_id}, function(err, data){;
		res.send(data);
		//console.log(data);
	});
});

//function to update client info
router.post('/update/:update_id',function(req,res){

	Client.updateOne({_id :req.params.update_id},{$set:{ 
			    client_name      		    :  req.body.client_name,
				certificate_sent  			:  req.body.certificate_sent,
	    		partners          			:  req.body.partners,
				status 						:  req.body.status,
				primary_email               :  req.body.primary_email,
				primary_contact             :  req.body.primary_contact,
				other                       :  req.body.other
				}
			},(err, data) =>{
					console.log(data);
					res.send(data);
			  }
	);
});



module.exports = router;