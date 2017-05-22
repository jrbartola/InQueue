/**
 * Session Schema Model
 */

var mongoose = require('mongoose');

// Define Session Schema
var sessionSchema = new mongoose.Schema({
    title: String,
    // Foreign key referencing User schema
    host: {
    	type: Schema.Types.ObjectId,
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
    }
});

mongoose.model('session', sessionSchema, 'session');