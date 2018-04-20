const db = require('../model');

exports.getPoints = (collectionName, json, callback) => {
  db.findDocument(collectionName, json, (err, docs) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, docs);
  })
}

exports.addPoint = (collectionName, json, callback) => {
  db.insertDocument(collectionName, json, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  })
}