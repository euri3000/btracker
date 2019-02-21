'use strict';
const config = require('./config');

const MongoClient = require('mongodb').MongoClient;
const uri = config.uri;
let cachedDb;

const FEEDING_COLLECTION = 'feeding';
const NAP_COLLECTION = 'nap';

module.exports = {
  displayLastFeedingTime: (event, context, callback) => {
    findFromDb(FEEDING_COLLECTION, context, callback)
  },
  displayLastNapTime: (event, context, callback) => {
    findFromDb(NAP_COLLECTION, context, callback)
  },

  updateLastFeedingTime: (event, context, callback) => {
    connectToDatabase(FEEDING_COLLECTION, context, callback);
  },

  updateLastNapTime: (event, context, callback) => {
    connectToDatabase(NAP_COLLECTION, context, callback);
  }
};

function connectToDatabase (collection, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;  
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("btrack");
    var json = {
      time: new Date().toLocaleString("en-US", {
        timeZone: "America/New_York"
      })
    };
    return insert(dbo, collection, json, callback);
  });
}

function findFromDb (collection, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("btrack");
    return queryDatabase(dbo, collection, callback);
  });
}

function queryDatabase (dbclient, collection, callback) {
  console.log('=> query database');
  dbclient.collection(collection).find({}).sort({time: -1}).limit(1).toArray(function(err, res) {
    if (err) throw err;
    console.log(res);
    
    const response_success = {
      statusCode: 200,
      body: JSON.stringify({
        message: res
      }),
    };
    callback(null, response_success);
  });
}

function insert (dbclient, collection, json, callback) {
  dbclient.collection(collection).insertOne(json, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted: " + JSON.stringify(json));
    const response_success = {
      statusCode: 200,
      body: JSON.stringify({
        message: "SUCCESS"
      }),
    };
    callback(null, response_success);

  });

}