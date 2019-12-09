var express = require('express');
var app = express();
var fs = require("fs");
var nodemailer = require("nodemailer");
//these are the modules that are needed for the code to work



process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
//this turns off SSL certificate checking, as we dont have a SSL certificate

var emailAccount = nodemailer.createTransport({ //this sets up the email account to send an email from
	service: 'gmail',
	auth: {
		user: 'webdevemailtest1@gmail.com',
		pass: 'Waterloo1'
	}
});


app.use(express.static('public'));//specifies where the static files are

app.get('/process_get', function (req, res) { //this is the function that reads the form data, stores it, sends the email and returns a repsomnse to the user
	
	
	
   
   data = {
      first_name:req.query.first_name,
      last_name:req.query.last_name,
	  email:req.query.email
   };
   

   
    var dataJSON = JSON.stringify(data);
	console.log(dataJSON);
   
	fs.appendFile("FormData.json", (dataJSON + '\n'),(err) => {
		   if (err) throw err;
		   
		   console.log("appended succesfully");
		   
		   
	   })
	   
	var emailDestination = {
		from: 'webdevemailtest1@gmail',
		to: req.query.email,
		subject: 'Thank you for signing up ' + req.query.first_name + "!",
		text: 'Yea so thanks boomer'
	};
	
	emailAccount.sendMail(emailDestination, function (error, info){
		if (error){
			console.log(error);
		}
		else {
			console.log("Email send: " + info.response);
			
			
		}
	});
	res.sendFile("public/thankyou.html", { root: __dirname });
	})
   
   
  


var server = app.listen(8000, function () { //setup the server
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});
