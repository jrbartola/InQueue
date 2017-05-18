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
    username: {
        type: String,
        unique: true
    },
    password : String,
    description : String,
    causes : [],
    location : {
        country: String,
        city: String
    }
});