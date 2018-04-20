const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'shuoshuo';

// Use connect method to connect to the server
// MongoClient.connect(url, function (err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });

const _connect = function (callback) {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      callback(err);
      return;
    }
    const db = client.db(dbName);
    callback(null, db, client);
  })
}

exports.findDocument = (collectionName, json, callback) => {
  _connect((err, db, client) => {
    if (err) {
      callback(err);
      return;
    }
    db.collection(collectionName).find(json).toArray((err, docs) => {
      client.close();
      if (err) {
        callback(err);
        return;
      }
      callback(null, docs);
    })
  })
};

exports.insertDocument = (collectionName, json, callback) => {
  _connect((err, db, client) => {
    if (err) {
      callback(err);
      return;
    }
    db.collection(collectionName).insertOne(json, (err, result) => {
      client.close();
      if (err) {
        callback(err);
        return;
      }
      callback(null, result);
    })
  })
}