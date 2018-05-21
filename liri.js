require("dotenv").config();
var Twitter = require('twitter');
var Request = require('request');
var Spotify = require('node-spotify-api');
var fileSys = require('file-system');

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

//CONVERTING OPTIONAL PARAMETERS TO STRING
var songMovieArr = [];
var songMovie;
for (let i=3; i<process.argv.length; i++) {
    songMovieArr.push(process.argv[i]);
    songMovie = songMovieArr.join(' ')
}

//INITIAL EXECUTION
liriRun(process.argv[2], songMovie);

function liriRun(input, input2) {
    switch(input) {
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
            if (!input2) {//SONG NOT SPECIFIED; DEFAULTING
                spotify.search({ type: 'track', query: 'Transilvanian Hunger' }, function(err, data) {
                    if (err) {
                        console.log('Error occurred: ' + err);
                    } else {
                        console.log(`
                            No song specified! Defaulting to...\n
                            Artist: ${data.tracks.items[0].album.artists[0].name}
                            Song: ${JSON.stringify(data.tracks.items[0].name)}
                            Preview mp3: ${JSON.stringify(data.tracks.items[0].preview_url, null, 1)}
                            Album: ${JSON.stringify(data.tracks.items[0].album.name)}
                        `); 
                    };
                });
            } else {//SONG SPECIFIED
                // var song;
                // var songArr = [];
                // for (let i=3; i<process.argv.length; i++) {
                //     songArr.push(process.argv[i]);
                //     song = songArr.join(' ')
                // }
                spotify.search({ type: 'track', query: input2 }, function(err, data) {
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
            if (!input2) {//MOVIE NOT SPECIFIED; DEFAULTING
                Request("http://www.omdbapi.com/?t=Tangerine&y=&plot=short&apikey=40e9cece", function(error, response, body) {
                    if (!error && response.statusCode === 200) {
                        console.log(`
                            No movie specified! Defaulting to...\n
                            Title: ${JSON.parse(body).Title}
                            Release Year: ${JSON.parse(body).Year}
                            IMDB Rating: ${JSON.parse(body).Ratings[0].Value}
                            RT Rating: ${JSON.parse(body).Ratings[1].Value}
                            Country: ${JSON.parse(body).Country}
                            Language: ${JSON.parse(body).Language}
                            Plot: ${JSON.parse(body).Plot}
                            Starring: ${JSON.parse(body).Actors}
                        `);
                    }
                });
            } else {//MOVIE SPECIFIED
                // var movieArr = [];
                // var movie;
                // for (let i=3; i<process.argv.length; i++) {
                //     movieArr.push(process.argv[i]);
                //     movie = movieArr.join(' ')
                // }
                Request(`http://www.omdbapi.com/?t=${input2}&y=&plot=short&apikey=40e9cece`, function(error, response, body) {
                    if (!error && response.statusCode === 200) {
                        console.log(`
                            Title: ${JSON.parse(body).Title}
                            Release Year: ${JSON.parse(body).Year}
                            IMDB Rating: ${JSON.parse(body).Ratings[0].Value}
                            RT Rating: ${JSON.parse(body).Ratings[1].Value}
                            Country: ${JSON.parse(body).Country}
                            Language: ${JSON.parse(body).Language}
                            Plot: ${JSON.parse(body).Plot}
                            Starring: ${JSON.parse(body).Actors}
                        `);
                    };
                });
            };
            break;
        case 'do-what-it-says':
            fileSys.readFile('random.txt', 'utf8', function(err, data) {
                if (err) {
                    console.log(err)
                } else {
                    var doArgs = data.split(',')
                    liriRun(doArgs[0],doArgs[1])
                }
            })
            break;
        default:
            console.log('Feed me parameters, Seymour!');
    }
}