﻿

// npm install request				
// npm install facebook-chat-api	

var request = require("request");
var login = require("facebook-chat-api");
var botkey = "http://ghuntur.com/simsim.php?lc=vn&deviceId=&bad=0&txt=";
login(
	{	
	email: "lexuanphuc.only1", 
	password: "phuc22111999" 
	},
function callback (err, api)
{
	if(err) return console.error(err);
	
	api.setOptions({forceLogin: true, selfListen: false, logLevel: "silent"});
	
	api.listen(function callback(err, message)
	{
		if(message.body === "/llooggoouutt") { 
			api.sendMessage(";) Ngừng auto chat thành công.", message.threadID); 
			api.markAsRead(message.threadID);
			return api.logout(err);
		}
		if (message.body==="Getid"||message.body==="getid"||message.body==="get id"||message.body==="Get id") {
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			api.sendMessage("Your ID: ", message.threadID); 
			api.sendMessage(message.senderID, message.threadID); 
			api.markAsRead(message.threadID); 
			console.log("Sender ID: " + message.senderID);
		}
		else if (message.body)
		{
			request(botkey + encodeURI(message.body),  
			function(error, response, body)
			{  
				let text = '';
				text += body;
				console.log(text.respSentence);
				api.sendMessage(text, message.threadID);					
			});
		}
	});
})