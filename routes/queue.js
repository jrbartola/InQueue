/**
 * Queue API Handler
 */

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var databaseCall = require('../util/databaseCalls');
var queueSchema = mongoose.model('queue');
var gen = require('../util/generate');

// API Routes
router.post('/create', makeQueue);
router.get('/get/:session', getQueuesBySessionCode);
router.get('/get/:session/:_type', getQueueBySessionCodeAndType);
router.get('/update/:session/:_type/:song_id', updateQueueWithSong);
router.delete('/delete/:session/:_type', deleteQueueBySessionCodeAndType);

module.exports = router;

/*
 * Create Queue POST route
 */
function makeQueue(req, res){
    var newQueue = new queueSchema();
    newQueue.songs = [];
    newQueue._type = req.body._type;
    newQueue.session = req.body.session;

    databaseCall.saveQuery(newQueue).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        res.json(err);
    });
}

/**
 * Get Queue by Session Code
 * @returns If given a valid session code will return an array of
 *   exactly three queues, one of each type: next, popular, and recent
 *   in no particular order
 */
function getQueuesBySessionCode(req, res) {
    var object = {};
    object['session'] =  req.params.session;
    databaseCall.findQuery(queueSchema, object).then(function (response) {
        res.json(response);
    });
}

/**
 * Get Queue by Session code and Type
 * @returns One queue with the respective session code and type, where
 * type can be: next, popular, or recent
 */
function getQueueBySessionCodeAndType(req, res) {
    var object = {};
    object['code'] = req.params.session;
    object['_type'] = req.params._type;
    databaseCall.findOneQuery(queueSchema, object).then(function (response) {
        res.json(response);
    });
}

/**
 * Update Queue With Song by Session code and _type
 * @returns A queue with the specified song added to songs array
 */
function updateQueueWithSong(req, res){
    var object = {};
    object['session'] = req.params.session;
    object['_type'] = req.params._type;
    var songID = req.params.song_id;

    databaseCall.findOneQuery(queueSchema, object).then(function (response){
        if (response.success) {
            var updatedQueue = response.data;
            updatedQueue.songs.push(songID);

            databaseCall.updateQuery(queueSchema, object, updatedQueue, false).then(function (response) {
                res.json(response);
            });
        } else {
            res.json(response);
        }
    });
}

/**
 * Delete Queue by registration code
 */
function deleteQueueBySessionCodeAndType(req, res) {
    var object = {};
    object['session'] = req.params.session;
    object['_type'] = req.params._type;
    databaseCall.deleteQuery(queueSchema, object).then(function (response) {
        res.json(response);
    });
}
