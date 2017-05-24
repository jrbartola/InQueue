/**
 * Database call abstractions
 */
var messages = require('../util/messages').messages;
var httpStatus = require('http-status-codes');
var q = require('q');

/**
 * Find query to search in mongoDB
 *
 * @param schema - schema to search in
 * @param query - query to be used
 * @param attr - attributes required
 * @returns {*|promise} - promise with data returned from mongoDB
 */
var findQuery = function(schema, query, attr) {
    var deferred = q.defer();
    var object = {};

    schema.find(query, attr, function(err, data) {
        if (err) {
            object.success = false;
            object.errorMessage = err;
            object.type = httpStatus.INTERNAL_SERVER_ERROR;
            deferred.reject(object);
        } else if (data) {
            object.success = true;
            object.data = data;
            object.type = httpStatus.OK;
            deferred.resolve(object);
        } else {
            object.success = false;
            object.errorMessage = messages.NOT_FOUND;
            object.type = httpStatus.NOT_FOUND;
            deferred.resolve(object);
        }
    });

    return deferred.promise;
};

/**
 * To save an object in mongoDB
 *
 * @param objectToSave - model to save
 * @returns {*|promise} - promise with saved data
 */
var saveQuery = function(objectToSave) {
    var deferred = q.defer();
    var object = {};

    objectToSave.save(function(err, data) {
        if (err) {
            object.success = false;
            if (err.hasOwnProperty('errmsg')){
                if(err.errmsg.includes("duplicate key error")){
                    object.errorMessage = messages.ALREADY_EXISTS;
                    object.error = err.errmsg;
                    object.type = httpStatus.CONFLICT;
                }
                else{
                    object.error = err;
                    object.type = httpStatus.INTERNAL_SERVER_ERROR;
                }
            }
            else{
                object.error = err;
                object.type = httpStatus.INTERNAL_SERVER_ERROR;
            }
            deferred.reject(object);
        } else if (data) {
            object.success = true;
            object.message = messages.SAVED_SUCCESSFULLY;
            object.data = data._id;
            object.type = httpStatus.CREATED;
            deferred.resolve(object);
        } else {
            object.success = false;
            object.errorMessage = messages.CANNOT_SAVE;
            object.type = httpStatus.NOT_FOUND;
            deferred.resolve(object);
        }

    });
    return deferred.promise;
};

/**
 * query to update in mongoDB
 *
 * @param objectToUpdate - model to update
 * @param query - query to be used
 * @param fieldsToUpdate - field we intend to update in our new object
 * @param upsert - create new on update it not exists
 * @returns {*|promise} - promise with saved data
 */
var updateQuery = function(objectToUpdate, query, fieldsToUpdate, upsert) {
    var deferred = q.defer();
    var object = {};

    objectToUpdate.update(query, fieldsToUpdate, { upsert: upsert },  function(err, data) {
        if (err) {
            object.success = false;
            object.errorMessage = err;
            object.type = httpStatus.INTERNAL_SERVER_ERROR;
            deferred.reject(object);
        } else if (data) {
            object.success = true;
            object.message = messages.UPDATED_SUCCESSFULLY;
            object.data = data;
            object.type = httpStatus.OK;
            deferred.resolve(object);
        } else {
            object.success = false;
            object.errorMessage = messages.CANNOT_SAVE;
            object.type = httpStatus.NOT_FOUND;
            deferred.resolve(object);
        }

    });

    return deferred.promise;
};

/**
 * query to delete in mongoDB
 *
 * @param schema - schema to search in
 * @param query - query to be used
 * @returns {*|promise} - promise with saved data
 */
var deleteQuery = function(schema, query){
    var deferred = q.defer();
    var object = {};

    schema.remove(query,function(err, data){
        if(err) {
            object.success = false;
            object.errorMessage = err;
            object.type = httpStatus.INTERNAL_SERVER_ERROR;
            deferred.reject(object);
        } else if (data.result.n) {
            object.success = true;
            object.message = messages.DELETED_SUCCESSFULLY;
            object.data = data.result;
            object.type = httpStatus.OK;
            deferred.resolve(object);
        } else {
            object.success = false;
            object.errorMessage = messages.NOT_FOUND;
            object.type = httpStatus.NOT_FOUND;
            deferred.resolve(object);
        }
    });

    return deferred.promise;
};

/**
 * Find distinct attribute in mongo
 *
 * @param schema - schema to search in
 * @param attr - distinct attribute
 * @param query - query to be used
 * @returns {*|promise} - promise with data returned from mongoDB
 */
var distinctQuery = function(schema, attr, query) {
    var deferred = q.defer();
    var object = {};

    schema.distinct(attr, query, function(err, data) {
        if (err) {
            object.isError = true;
            object.errorMessage = err;
            object.type = httpStatus.INTERNAL_SERVER_ERROR;
            deferred.resolve(object);
        } else if (data) {
            object.isError = false;
            object.data = data;
            object.type = httpStatus.OK;
            deferred.resolve(object);
        } else {
            object.isError = false;
            object.errorMessage = messages.NOT_FOUND;
            object.type = httpStatus.NOT_FOUND;
            deferred.resolve(object);
        }
    });

    return deferred.promise;
};

/**
 * Aggregate and project in mongo
 *
 * @param schema - schema to search in
 * @param query - query to be used
 * @returns {*|promise} - promise with data returned from mongoDB
 */
var aggregateQuery = function(schema, query) {
    var deferred = q.defer();
    var object = {};

    schema.aggregate(query, function(err, data) {
        if (err) {
            object.isError = true;
            object.errorMessage = err;
            object.type = httpStatus.INTERNAL_SERVER_ERROR;
            deferred.resolve(object);
        } else if (data) {
            object.isError = false;
            object.data = data;
            object.type = httpStatus.OK;
            deferred.resolve(object);
        } else {
            object.isError = false;
            object.errorMessage = messages.NOT_FOUND;
            object.type = httpStatus.NOT_FOUND;
            deferred.resolve(object);
        }
    });

    return deferred.promise;
};

/**
 * Find one query to search one in mongoDB
 *
 * @param schema - schema to search in
 * @param query - query to be used
 * @param attr - attributes required
 * @returns {*|promise} - promise with one object returned from mongoDB
 */
var findOneQuery = function(schema, query, attr) {
    var deferred = q.defer();
    var object = {};

    schema.findOne(query, attr, function(err, data) {
        if (err) {
            object.success = false;
            object.errorMessage = err;
            object.type = httpStatus.INTERNAL_SERVER_ERROR;
            deferred.reject(object);
        } else if (data) {
            object.success = true;
            object.data = data;
            object.type = httpStatus.OK;
            deferred.resolve(object);
        } else {
            object.success = false;
            object.errorMessage = messages.NOT_FOUND;
            object.type = httpStatus.NOT_FOUND;
            deferred.resolve(object);
        }
    });

    return deferred.promise;
};

exports.findQuery = findQuery;
exports.saveQuery = saveQuery;
exports.updateQuery = updateQuery;
exports.deleteQuery = deleteQuery;
exports.distinctQuery = distinctQuery;
exports.aggregateQuery = aggregateQuery;
exports.findOneQuery = findOneQuery;