var TwitterPakage = require('twit');
var config = require('./config.js');
 
var Twitter = new TwitterPakage(config);

// Twitter.post('statuses/update', {status: 'This is my first manual tweet with Node.js!'},  function(error, tweet, response){
//   if(error){
//     console.log(error);
//   }

//   console.log(tweet);  // Tweet body.
// });

Twitter.stream('statuses/filter', {track: '#trump'}, function(stream) {

	stream.on('data', function(tweet) {
    	console.log(tweet.text);

    //build our reply object
    	var statusObj = {status: "Hi @" + tweet.user.screen_name + ", Good one!"}

    	Twitter.post('status/update', statusObj, function(error, tweetReply, response) {

    		if (error) {
    			console.log(error);
        	}

    		console.log(tweetReply.text);

    	});
  	});

  	stream.on('error', function(error) {
  		console.log(error);
  	});

});