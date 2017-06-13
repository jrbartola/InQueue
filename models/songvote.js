/**
 * SongVote Schema Model
 */

 var mongoose = require('mongoose');

/*
 * Define SongVote Schema
 */

var songVoteSchema = new mongoose.Schema({
    // Spotify ID of the song that is being voted on
    spotify_id: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    // Some unique form of identification for our user
    user: {
        type: String,
        required: true
    },
    upvote: {
        type: Boolean,
        required: true
    },
    // Weight of the vote. Defaults to 1
    weight: {
        type: Number,
        default: 1
    },


});

mongoose.model('songvote', songVoteSchema, 'songvote');
