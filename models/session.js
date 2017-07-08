/**
 * Session Schema Model
 */

var mongoose = require('mongoose');

// Define Session Schema
var sessionSchema = new mongoose.Schema({
    title: String,
    // Foreign key referencing User schema
    host_id: {
    	type: String,
    	required: true
    },
    time: {
    	type: Date,
        default: Date.now
    },
    // Unique, generated auto-join code
    code: {
        type: String,
        unique: true,
        required: true
    },
    // Queue contains an array of queueSong ID's
    queue: {
        type: [String],
        required: true
    }
});

mongoose.model('session', sessionSchema, 'session');