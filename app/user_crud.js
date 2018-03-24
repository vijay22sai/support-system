const express 	= require('express');
const router    = express.Router();
const User      = require('../models/user_model');
const mail      = require('./mailer');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const c_parser  = require('cookie-parser');

//cookie related functionality
router.use(c_parser());

//declaration for bcrypt
let saltrounds   = 10;

//function to add new user
router.post('/add',function(req, res){
	//encrypting password
	let salt  			   = bcrypt.genSaltSync(saltrounds);
    let hashed_password   = bcrypt.hashSync(req.body.password,salt);

	let new_user = new User({
		user_name      :   req.body.user_name,
		user_id        :   req.body.user_id,
		password       :   hashed_password,
		role           :   req.body.role,
		email          :   req.body.email,
		contact        :   req.body.contact
	});
	new_user.save(function(err, data){
		res.send(data);
	});
});

//function to delete user
router.get('/delete/:delete_id', function(req, res){
	User.remove({_id:req.params.delete_id}, function(err,data){
		res.send(data);
	});
});

//function to update user
router.post('/update', function(req, res){
	User.updateOne({_id : req.body._id}, {$set :{
				user_name       :   req.body.user_name,
				role           	:   req.body.role,
				email          	:   req.body.email,
				contact        	:   req.body.contact
	}},(err,data) =>{
		res.send(data);
	});
});

//function to get all users
router.get('/all', function(req,res){
	User.find({},(err,data) =>{
		res.send(data);
	});
});

//function to authenticate user
router.post('/authenticate',function(req,res){
	User.findOne({user_id : req.body.user_id},function(err,user){
		if(!user){
				res.send("No user exists with this Id");
		}
		else{
			if(!bcrypt.compareSync(req.body.password,user.password)){
				res.send('Invalid Password');
			}
			else{
				let payload  = { user_id : user.user_id };
				let token    = jwt.sign(payload, "support");
				res.cookie('token',token);
				res.sendStatus(200);
			}
		}
	});
});

//function to change password
router.post('/change_pwd', function(req,res){
	User.findOne({user_id : req.body.user_id},function(err,user){
			if(!bcrypt.compareSync(req.body.password,user.password)){
				res.send('Invalid password');
			}
			else{
				hashed_password   = bcrypt.hashSync(req.body.new_password,10);
				User.updateOne({user_id : req.body.user_id},{$set:{
             		password : hashed_password
				}},(err,data) => {
					res.send(data);
				});
			}
	});

});

router.post("/reset_password_setup",function(req,res){
	console.log(req.body.user_id);
	let payload  = { user_id : req.body.user_id };
	let token    = jwt.sign(payload, "support");
	 let mailOptions = {
        from: '"Fred Foo 👻" <arunbandari0@example.com>', // sender address
        to: 'arunbandari2@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };
    mail(mailOptions);

});

module.exports = router;
