let express 	= require('express');
let app			= express();
let client_crud = require('./app/client_crud');
let license_crud= require('./app/license_crud');
let user_crud   = require('./app/user_crud');
let mongoose    = require('mongoose');
let bodyParser  = require('body-parser');

//middleware for parsing request
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({}));

app.use(express.static(__dirname+'/public'));
//mongo db connection
let db = 'mongodb://localhost:27017/support';
mongoose.connect(db,function(err){
	if(err) console.log('error');
	else console.log('connected');
});
app.get('/',function(req,res){
	console.log('hi');
	res.sendFile(__dirname+'/public/views/index.html');
});
app.use('/client',client_crud);
app.use('/license',license_crud);
app.use('/user',user_crud);
// server 
app.listen('3000',function(err) {
	console.log('Server is Up !');
});