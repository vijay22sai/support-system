const express   = require('express');
const router    = express.Router();
const bodyParser= require('body-parser');
const Service   = require('../models/service_model.js');

// function to get all services info
router.get('/all',function(req,res){
	Service.find({},function(err,data){
		res.json(data);
	});
});

//function to add new service
router.post('/add',function(req,res){

	let service = new Service({
		service         			: req.body.service.service,
		service_handle   			: req.body.service.handle,
		description		 			: req.body.service.description,
		color						: req.body.service.colour
	});
	service.save((err, data) =>{
		console.log(data);
		res.send("saved");
	}); 
});

//function to delete service
router.get('/delete',function(req,res){
	Service.remove({_id:req.params.id}, function(err, data){;
		res.send(data);
		//console.log(data);
	});
});

//function to update service info
router.post('/update',function(req,res){

	Service.updateOne({_id :req.body.service._id},{$set:{ 
			    service         			: req.body.service.service,
				service_handle   			: req.body.service.service_handle,
				description		 			: req.body.service.description
				}
			},(err, data) =>{
					console.log(data);
					res.send(data);
			  }
	);
});



module.exports = router;