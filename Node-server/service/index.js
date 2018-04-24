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
const Point = require('../model/Point');
const ObjectId = require('mongodb').ObjectID;

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

//得到所有的points
exports.getPoints = function ({ }, callback) {
  Point.find({}, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, res);
  })
}

//添加point
exports.addPoint = function (point, callback) {
  let pointInstant = new Point(point);
  pointInstant.save(function (err, pointinstant) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, pointinstant);
  })
}

// 增加评论接口
exports.addComment = function (_id, comment, callback) {
  Point.findOne({ _id: ObjectId(_id) }, (err, point) => {
    if (err) {
      callback(err);
      return;
    }
    // 得到一个point
    point.comments.push(comment);
    point.save(function (err, res) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, res);
    })
  })
}
