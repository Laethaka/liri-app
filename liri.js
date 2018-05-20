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
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

switch(process.argv[2]) {
    case 'my-tweets':
        arr = [];
        client.get('statuses/user_timeline/830446152042573824/', {count: 20}, function(error, tweets, response) {
            if(error) {
                console.log(error)
            };
            for (let i=0; i<tweets.length; i++) {
                arr.push(tweets[i].created_at)
                arr.push(tweets[i].text);
            }
            console.log(arr);
        });
        break;
    case 'spotify-this-song':
        var songArr = [];
        if (process.argv.length===3) {//SONG NOT SPECIFIED; DEFAULTING
            spotify.search({ type: 'track', query: 'The Sign Ace of Base' }, function(err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                } else {
                    console.log(`
                        No song inputed! Defaulting to...\n
                        Artist: ${data.tracks.items[0].album.artists[0].name}\n
                        Song: ${JSON.stringify(data.tracks.items[0].name)}\n
                        Preview mp3: ${JSON.stringify(data.tracks.items[0].preview_url, null, 1)}\n
                        Album: ${JSON.stringify(data.tracks.items[0].album.name)}
                    `); 
                };
            });
        } else {//SONG SPECIFIED
            var song;
            for (let i=3; i<process.argv.length; i++) {
                songArr.push(process.argv[i]);
                song = songArr.join(' ')
            }
            spotify.search({ type: 'track', query: song }, function(err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                } else {
                    console.log(`
                        Artist: ${data.tracks.items[0].album.artists[0].name}\n
                        Song: ${JSON.stringify(data.tracks.items[0].name)}\n
                        Preview mp3: ${JSON.stringify(data.tracks.items[0].preview_url, null, 1)}\n
                        Album: ${JSON.stringify(data.tracks.items[0].album.name)}
                    `);
                };
            });
        };
        break;
    case 'movie-this':
        
        break;
    case 'do-what-it-says':
        break;
}