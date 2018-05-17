require("dotenv").config();
var Twitter = require('twitter');
var Request = require('request');
var Spotify = require('node-spotify-api');

// var keys = require('./keys.js');
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var userInput = process.argv[2];

switch(userInput) {
    case 'my-tweets':
        client.get('favorites/list', function(error, tweets, response) {
            if(error) {
                console.log(error)
            };
            console.log(tweets);  // The favorites.
            // console.log(response);  // Raw response object.
        });
    case 'spotify-this-song':

    case 'movie-this':

    case 'do-what-it-says':
}