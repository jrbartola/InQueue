/**
 * QueueSong Schema Model
 */

 var mongoose = require('mongoose');

/*
 * Define QueueSong Schema
 */

var queueSongSchema = new mongoose.Schema({
    spotify_id: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: String,
    time_ago: {
        type: Number,
        default: Date.now
    }
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    }
});

mongoose.model('queuesong', queueSongSchema, 'queuesong');
