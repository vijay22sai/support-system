let express 	= require('express');
let app			= express();
let client_crud = require('./app/client_crud');
let license_crud= require('./app/license_crud');
let user_crud   = require('./app/user_crud');
let service_crud= require('./app/service_crud');
let mongoose    = require('mongoose');
let bodyParser  = require('body-parser');
let cron = require('node-cron');
let schedule = require('./app/schedular');


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
	res.sendFile(__dirname+'/public/views/index.html');
});

app.get('/logout',function(req,res){
	res.clearCookie("token");
	res.redirect("/");
});

app.use('/client',client_crud);
app.use('/license',license_crud);
app.use('/user',user_crud);
app.use('/service',service_crud);
// server 
app.listen('3000',function(err) {
	console.log('Server is Up !');
});
