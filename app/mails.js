const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const License    = require('../models/license_model');
const Client     = require('../models/client_model');
var nodemailer = require('nodemailer');
module.exports=function(license)
{//function
    let client,content;
    Client.findOne({_id : license.client_id},function(err,data){
        client=data;
        console.log(client); 
    });
    var today = new Date();
    var renewal = new Date(license.support_renewal_date);
    var diffMs = (renewal - today); // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
   // var diffHrs = Math.floor((diffMs % 86400000) / 3600000); 
    if(license.license_status=="pending")
    content = '<h1> License status for the product '+license.product+" is "+ license.license_status+'</h1>'+
    '<center><table border=0>'+'<tr><td>Company Name</td><td>'+"name"+'</td></tr>'+
    '<tr><td>Product Name:</td><td>'+license.product+'</td></tr>'+
    '<tr><td>No. of. Licenses:</td><td>'+license.no_of_licenses+'</td></tr>'+
    '<tr><td>Renewal Date:</td><td>'+license.support_renewal_date+'</td></tr>'+
    '<tr><td>Status:</td><td>'+license.license_status+'</td></tr>'+
    '<tr><td>license will be on hold in :</td><td>'+Math.abs(diffDays)+" days"+'</td></tr>'+
    '</table></center>';

    if(license.license_status=="hold")
    content = '<h1> License status for the product '+license.product+" is "+ license.license_status+'</h1>'+
    '<center><table border=0>'+'<tr><td>Company Name</td><td>'+"name"+'</td></tr>'+
    '<tr><td>Product Name:</td><td>'+license.product+'</td></tr>'+
    '<tr><td>No. of. Licenses:</td><td>'+license.no_of_licenses+'</td></tr>'+
    '<tr><td>Renewal Date:</td><td>'+license.support_renewal_date+'</td></tr>'+
    '<tr><td>Status:</td><td>'+license.license_status+'</td></tr>'+
    '<tr><td>license will be blocked in :</td><td>'+Math.abs(diffDays)+" days"+'</td></tr>'+
    '</table></center>';

    if(license.license_status=="active")
    content = '<h1> License status for the product '+license.product+" is "+ license.license_status+'</h1>'+
    '<center><table border=0>'+'<tr><td>Company Name</td><td>'+"name"+'</td></tr>'+
    '<tr><td>Product Name:</td><td>'+license.product+'</td></tr>'+
    '<tr><td>No. of. Licenses:</td><td>'+license.no_of_licenses+'</td></tr>'+
    '<tr><td>Renewal Date:</td><td>'+license.support_renewal_date+'</td></tr>'+
    '<tr><td>Status:</td><td>'+license.license_status+'</td></tr>'+
    '</table></center>';

    if(license.license_status=="blocked")
    content = '<h1> License status for the product '+license.product+" is "+ license.license_status+'</h1>';

                    
    let mailOptions = {
        from   : '"APPLAUD SUPPORT " <arunbandari0@example.com>', // sender address
        to     :  'bhargavi.ch17@gmail.com', // list of receivers
        subject: ' your status for '+license.product, // Subject line
        html   : content // plain text body
    };
    //mail start
    var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'Gmail' ,
    port: 465   ,
    secure: false,
    requireTLS: true,
      auth: {
        user: 'arunbandari0@gmail.com',
        pass: 'arun12345'
      }//auth
    });// createTransport
    
     transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }//else
    });//sendMail
//mail end
} //service end

