/**
 * User API Handler
 */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var databaseCall = require('../util/databaseCalls');
var userSchema = mongoose.model('user');

// API Routes
router.post('/create', makeUser);
router.get('/get/:fb_id', getUserByFacebookId);
router.put('/update/:fb_id', updateUserByFacebookId);
router.put('/upsert/:fb_id', upsertUserByFacebookId);
router.delete('/delete/:fb_id', deleteUser);

module.exports = router;

/*
 * Create User POST route
 */
function makeUser(req, res){
    var newUser = new userSchema();
    newUser.email = req.body.email;
    newUser.facebook_id = req.body.facebook_id;
    databaseCall.saveQuery(newUser).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        res.json(err);
    });
}

/**
 * Get User by FacebookID
 */
function getUserByFacebookId(req, res) {
    var object = {};
    object['facebook_id'] = req.params.fb_id;
    databaseCall.findOneQuery(userSchema, object).then(function (response) {
        res.json(response);
    });
}

/**
 * Update User by FacebookID PUT route
 */
function updateUserByFacebookId(req, res){
    var object = {};
    object['facebook_id'] = req.params.fb_id;
    databaseCall.findOneQuery(userSchema, object).then(function (response){
        if (response.success) {
            var updatedUser = req.body;
            databaseCall.updateQuery(userSchema, object, updatedUser, false).then(function (response) {
                res.json(response);
            });
        } else {
            res.json(response);
        }
    });
}

/**
 *  Upsert User by FacebookID (for login purposes)
 */
function upsertUserByFacebookId(req, res) {
    var object = {};
    object['facebook_id'] = req.params.fb_id;

    // This may be null if no additional fields are provided (name, location, etc.)
    var updatedUser = req.body;
    updatedUser.last_login = Date.now();

    // Increment logins by 1
    updatedUser.$inc = { num_logins: 1 };

    databaseCall.updateQuery(userSchema, object, updatedUser, true).then(function (response) {
        res.json(response);
    });
}


/**
 * Delete User by ObjectID
 */
function deleteUser(req, res) {
    var object = {};
    object['facebook_id'] = req.params.fb_id;
    databaseCall.deleteQuery(userSchema, object).then(function (response) {
        res.json(response);
    });
}
