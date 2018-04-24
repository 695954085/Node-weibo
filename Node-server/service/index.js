// const db = require('../model');

// exports.getPoints = (collectionName, json, callback) => {
//   db.findDocument(collectionName, json, (err, docs) => {
//     if (err) {
//       callback(err);
//       return;
//     }
//     callback(null, docs);
//   })
// }

// exports.addPoint = (collectionName, json, callback) => {
//   db.insertDocument(collectionName, json, (err, result) => {
//     if (err) {
//       callback(err);
//       return;
//     }
//     callback(null, result);
//   })
// }

const User = require('../model/User');

//通过_id得到user
exports.getAuthorInf = function (_id, callback) {
  User.findOne({ _id: _id }, (err, user) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, user);
  });
}


