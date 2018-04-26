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

  // ---------旧处理办法----------
  // Point.update({ _id: ObjectId(_id) }, {
  //   $push: {
  //     "comments": comment
  //   }
  // }, function (err, result) {
  //   if (err) {
  //     callback(err);
  //     return;
  //   }
  //   callback(null, result);
  // });
}

// 添加评论赞的功能
exports.addLike = function (_id, like, callback) {
  Point.findOne({ _id: ObjectId(_id) }, function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    result.like.push(like);
    result.save(function (err, newResult) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, newResult);
    });
  });
}

// 获取某个人的point
exports.getSomeOnePoint = function (aid, callback) {
  Point.find({ aid: aid }, null, { sort: { date: 1 } }, function (err, points) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, points);
  })
}

// 判断登录判断
exports.doLogin = function (user, callback) {
  User.findOne(user, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result);
  })
}

exports.doRegist = function (fields, callback) {
  let user = new User(fields);
  user.save(function (err, userInstance) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, userInstance);
  });
}