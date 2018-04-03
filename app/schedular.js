let cron = require('node-cron');
const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const License    = require('../models/license_model');
const Client     = require('../models/client_model');
const mails      = require('./mails.js');
cron.schedule('*/60 * * * *', function(){
   let m_count; 
   let today = new Date();
   License.find({},function(err,data){
      data.forEach((license)=>{
      
         let t = ( new Date(license.support_renewal_date)- today)/(1000*60*60*24);
 
         //if the license status is not active or blocked  then increment mail_count
         if(license.license_status!="active" && license.license_status!="blocked")
         {
              m_count=license.mail_count+1;
               License.updateOne({_id: license._id},{$set:{mail_count: m_count}},function(err,data){
               console.log("incremented");
               });
         }

         //should get executed for 7 days(reset the count to one)
         if(m_count>=license.repeat)
         {
            //sendmail and then
            mails(license);
            License.updateOne({_id: license._id},{$set:{mail_count: 1}},function(err,data){
            console.log("set to 1 after increment reached 7");
            });
         }

         // the license is active state
         if(t >= 30 && license.license_status!="active")
         {
            console.log("every thing is fine");
            state_change("active",license._id,333);
            mails(license);
         }
         else if(t < 30 && t >= 0 && license.license_status!="pending")
         {
            console.log("pending");
            state_change("pending",license._id,1);
            mails(license);
            //count starts from now

         }  
         else if(t < 0 && t >= -30 && license.license_status!="hold")
         {  
            console.log("hold");
            state_change("hold",license._id,1);
            mails(license);
         }
         else if(t < -30&&license.license_status!="blocked")
        { 
          console.log("blocked");
          state_change("blocked",license._id,-333); //-333 to identify license as blocked
           mails(license);
        }
      
      });
   });

   //function to change the license status 
    function state_change(status,id,count){
      License.updateOne({_id:id}, {$set : {
            license_status : status,
            mail_count     : count 
      }},function(err,data){
            console.log(data);
      });
   }
});