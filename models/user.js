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
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    num_logins : {
        type: Number,
        default: 0
    }
    facebook_id: Number
});

mongoose.model('user', userSchema, 'user');
