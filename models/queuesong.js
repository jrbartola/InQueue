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
    name: {
        type: String,
        required: true
    },
    time_ago: {
        type: Number,
        default: 0
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
