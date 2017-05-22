/**
 * User Schema Model
 */

 var mongoose = require('mongoose');

/*
 * Define User Schema
 */

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
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

mongoose.model('user', userSchema, 'user');
