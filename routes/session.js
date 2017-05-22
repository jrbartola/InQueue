/**
 * Session API Handler
 */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var databaseCall = require('../util/databaseCalls');
var sessionSchema = mongoose.model('session');
var gen = require('../util/generate');

// API Routes
router.post('/create', makeSession);
router.get('/get/:_id', getSessionById);
router.get('/get/code/:code', getSessionByCode);
router.put('/update/:_id', updateSessionById);
router.put('/update/code/:code', updateSessionByCode);
router.delete('/delete/code/:code', deleteSessionByCode);

module.exports = router;

/*
 * Create Session POST route
 */
function makeSession(req, res){
    var newSession = new sessionSchema();
    newSession.title = req.body.title;
    newSession.host_id = req.body.host_id;

    // Generate our 6-character session registration code
    newSession.code = gen.generateSessionCode();

    databaseCall.saveQuery(newSession).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        res.json(err);
    });
}

/**
 * Get Session by ObjectID
 */
function getSessionById(req, res) {
    var object = {};
    object['_id'] =  mongoose.Types.ObjectId(req.params._id);
    databaseCall.findOneQuery(sessionSchema, object).then(function (response) {
        res.json(response);
    });
}

/**
 * Get Session by registration code
 */
function getSessionByCode(req, res) {
    var object = {};
    object['code'] = req.params.code;
    databaseCall.findOneQuery(sessionSchema, object).then(function (response) {
        res.json(response);
    });
}

/**
 * Update Session by ObjectId
 * (not quite sure what we'd want to update, but
 *  here's the PUT route anyways)
 */
function updateSessionById(req, res){
    var object = {};
    object['_id'] = mongoose.Types.ObjectId(req.params._id);
    databaseCall.findOneQuery(sessionSchema, object).then(function (response){
        if (response.success) {
            var updatedSession = req.body;
            databaseCall.updateQuery(sessionSchema, object, updatedSession, false).then(function (response) {
                res.json(response);
            });
        } else {
            res.json(response);
        }
    });
}

/**
 * Update Session by registration code
 */
function updateSessionByCode(req, res){
    var object = {};
    object['code'] = req.params.code;
    databaseCall.findOneQuery(sessionSchema, object).then(function (response){
        if (response.success) {
            var updatedSession = req.body;
            databaseCall.updateQuery(sessionSchema, object, updatedSession, false).then(function (response) {
                res.json(response);
            });
        } else {
            res.json(response);
        }
    });
}

/**
 * Delete Session by registration code
 */
function deleteSessionByCode(req, res) {
    var object = {};
    object['code'] = req.params.code;
    databaseCall.deleteQuery(sessionSchema, object).then(function (response) {
        res.json(response);
    });
}
