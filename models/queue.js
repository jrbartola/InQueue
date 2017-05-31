/**
 * Queue Schema Model
 */

 var mongoose = require('mongoose');

/*
 * Define Queue Schema
 */

var queueSchema = new mongoose.Schema({
    songs: [],
    name: {
        first: String,
        last: String
    },
    password: String,
    num_logins : {
        type: Number,
        default: 0
    },
    last_login : {
        type: Date,
        default: Date.now
    },
    facebook_id: String
});

mongoose.model('queue', userSchema, 'queue');
