/**
 * QueueSong API Handler
 */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var databaseCall = require('../util/databaseCalls');
var queueSongSchema = mongoose.model('queuesong');

// API Routes
router.post('/create', makeQueueSong);
router.get('/get/session/:sessionID/spotify/:spotify_id', getQueueSongsBySpotifyId);
router.get('/get/session/:sessionID/artist/:artist', getQueueSongsByArtist);
router.get('/get/session/:sessionID/title/:song_title', getQueueSongsByTitle);
router.get('/update/session/:sessionID/spotify/:spotify_id', updateQueueSongBySpotifyId);
router.delete('/delete/session/:sessionID/spotify/:spotify_id', deleteQueueBySpotifyId);

module.exports = router;

/*
 * Create QueueSong POST route
 */
function makeQueueSong(req, res){
    var newQueueSong = new queueSongSchema();
    // Artist and song title can probably come from the spotify API lookup
    newQueueSong.title = req.body.title;
    newQueueSong.artist = req.body.artist;
    newQueueSong.spotify_id = req.body.spotify_id;
    newQueueSong.session = req.body.sessionID;
    
    databaseCall.saveQuery(newQueueSong).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        res.json(err);
    });
}

// Note: For all API routes, sessionID is included in the query parameters in order
// to specify which song we want to deal with

/**
 * Get QueueSongs by Spotify Id
 * @returns A queueSong instance with the respective spotify id
 */
function getQueueSongsBySpotifyId(req, res) {
    var object = {};
    object['session'] = req.params.sessionID;
    object['spotify_id'] = req.params.spotify_id;
    databaseCall.findQuery(queueSongSchema, object).then(function (response) {
        res.json(response);
    });
}

/**
 * Get QueueSongs by Artist name
 * @returns An array of QueueSong instance(s) with the respective artist name
 */
function getQueueSongsByArtist(req, res) {
    var object = {};
    object['session'] = req.params.sessionID;
    object['artist'] = req.params.artist;
    databaseCall.findQuery(queueSongSchema, object).then(function (response) {
        res.json(response);
    });
}

/**
 * Get QueueSongs by Artist name
 * @returns An array of QueueSong instance(s) with the respective song title
 */
function getQueueSongsByTitle(req, res) {
    var object = {};
    object['session'] = req.params.sessionID;
    object['title'] = req.params.song_title;
    databaseCall.findQuery(queueSongSchema, object).then(function (response) {
        res.json(response);
    });
}

/**
 * Update QueueSong by SpotifyId
 * @returns An updated queueSong with the most recent number of upvotes/downvotes
 */
function updateQueueSongBySpotifyId(req, res){
    var object = {};
    object['session'] = req.params.sessionID;
    object['spotify_id'] = req.params.spotify_id;

    // Find all entries in the vote table that have been cast on this particular queueSong instance
    databaseCall.findOneQuery(voteSchema, object).then(function (response){
        if (response.success) {
            // TODO:
            // var upvotes = response.data. { # of upvotes }
            // var downvotes = response.data. { # of downvotes }

            databaseCall.updateQuery(queueSongSchema, object, updatedQueue, false).then(function (response) {
                res.json(response);
            });
        } else {
            // QueueSong has not been voted on yet
            res.json(response);
        }
    });
}

/**
 * Delete Queue by registration code
 */
function deleteQueueSongBySpotifyId(req, res) {
    var object = {};
    object['session'] = req.params.sessionID;
    object['spotify_id'] = req.params.spotify_id;
    databaseCall.deleteQuery(queueSongSchema, object).then(function (response) {
        res.json(response);
    });
}
