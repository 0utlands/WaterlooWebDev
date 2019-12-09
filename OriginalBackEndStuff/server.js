var express = require('express');
var app = express();
var fs = require("fs");
var nodemailer = require("nodemailer");



process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

var emailAccount = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'webdevemailtest1@gmail.com',
		pass: 'Waterloo1'
	}
});


app.use(express.static('public'));//specifies where the static files are

app.get('/process_get', function (req, res) {
	
	
	
   
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
	
	res.send("data sent successfully");
	
	
	
	

	})

   
  


var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Server running at http://%s:%s", host, port)
});
