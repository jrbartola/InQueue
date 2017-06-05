/**
 * Queue Schema Model
 */

 var mongoose = require('mongoose');

/*
 * Define Queue Schema
 */

var queueSchema = new mongoose.Schema({
    // Array of queuesong IDs
    songs: [String],
    _type: {
        // Type of queue can either be next, recent, or popular
        type: String,
        required: true
    },
    // SessionID this queue belongs to
    session: {
        type: String,
        required: true
    }
});

mongoose.model('queue', queueSchema, 'queue');
