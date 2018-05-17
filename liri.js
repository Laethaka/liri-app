require("dotenv").config();

var keys = require('keys.js');

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var userInput = process.argv[2];