let express = require('express');
let app			= express();
let Client  = require('./models/client_model');
let mongoose   = require('mongoose');
let bodyParser = require('body-parser');
let db = 'mongodb://localhost:27017/support';
mongoose.connect(db,function(err){
	if(err) console.log('error');
	else console.log('connected');
});

app.get('/all',function(req,res){
	var newClient = new Client({
		client_name : 'arun'
	});
	newClient.save(function(err, docs){
		if(err) throw err;
		console.log('Saved');
		res.json(docs);
	});
});

app.listen('3000',function(err) {
	console.log('Server is Up !');
});