/**
 * SongVote API Handler
 */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var databaseCall = require('../util/databaseCalls');
var songVoteSchema = mongoose.model('songvote');

// API Routes
router.post('/create', makeSongVote);
router.get('/get/session/:sessionID/spotify/:spotify_id', getSongVotesBySpotifyId);
router.get('/update/session/:sessionID/spotify/:spotify_id', updateSongVoteBySpotifyId);
router.delete('/delete/session/:sessionID/spotify/:spotify_id/user/:user_id', deleteSongVote);

module.exports = router;

/*
 * Create songVote POST route
 */
function makeSongVote(req, res){
    var newSongVote = new songVoteSchema();
    newSongVote.spotify_id = req.body.spotify_id;
    newSongVote.session = req.body.sessionID;
    newSongVote.user = req.body.user;
    // Boolean dictating whether to negate the weight or not
    newSongVote.upvote = req.body.upvote;

    if (newSongVote.upvote === false)
        newSongVote.weight = -1;
    
    // Try to upsert.
    databaseCall.updateQuery(songVoteSchema, {spotify_id: req.body.spotify_id,
        session: req.body.session, user: req.body.user}, newSongVote, true).then(function (response) {

        res.json(response);
    });

    // Check if we've already voted. If we have, update the existing vote entry
    // databaseCall.findOneQuery(songVoteSchema, newSongVote).then(function (response) {
    //     if (response.success && response.data) {
    //         databaseCall.updateQuery(songVoteSchema, object, updatedQueue, false).then(function (response) {
    //             res.json(response);
    //         });
    //     } else {
    //         // If there isn't a duplicate simply save this vote entry
    //         databaseCall.saveQuery(newSongVote).then(function (result) {
    //             res.json(result);
    //         }).catch(function (err) {
    //             res.json(err);
    //         });
    //     }
    // });

    
}

// Note: For all API routes, sessionID is included in the query parameters in order
// to specify which song we want to deal with

/**
 * Get SongVotes by Session and Spotify Id
 * @returns An array of SongVote instance(s) with the respective spotify id
 */
function getSongVotesBySessionAndSpotifyId(req, res) {
    var object = {};
    object['session'] = req.params.sessionID;
    object['spotify_id'] = req.params.spotify_id;
    databaseCall.findQuery(songVoteSchema, object).then(function (response) {
        res.json(response);
    });
}


// Don't need this route- this is taken care of just by creating a new instance of
// songVote and using the upsert if it exists

/**
 * Update SongVote by SpotifyId
 * @returns An updated SongVote with the most recent number of upvotes/downvotes
 */

/**
 * Delete SongVote given sessionID, spotify_id, and user_id
 */
function deleteSongVote(req, res) {
    var object = {};
    object['session'] = req.params.sessionID;
    object['spotify_id'] = req.params.spotify_id;
    object['user'] = req.params.user_id;
    databaseCall.deleteQuery(songVoteSchema, object).then(function (response) {
        res.json(response);
    });
}
