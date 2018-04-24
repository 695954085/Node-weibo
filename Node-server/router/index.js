const db = require('../model');
const { getPoints, addPoint, getAuthorInf, addComment } = require('../service');
const formidable = require('formidable');

exports.showIndex = (req, res, next) => {

}

exports.getPointsFromServer = (req, res, next) => {
  getPoints({}, (err, docs) => {
    if (err) {
      res.send({
        code: 500,
        msg: '服务器异常'
      });
    } else {
      res.send(docs);
    }
  })
}

exports.addPointFromClient = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    fields.date = new Date(fields.date);
    addPoint(fields, (err, result) => {
      if (err) {
        res.send({
          code: 500,
          msg: '服务器异常'
        })
      } else {
        res.send(result);
      }
    })
  });
}

exports.getAuthorInf = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    getAuthorInf(fields._id, (err, result) => {
      if (err) {
        res.send({
          code: 500,
          msg: "服务器异常"
        })
      } else {
        res.send(result);
      }
    })
  });
}

// 添加一个增加评论接口
exports.addComment = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // 获取point的_id
    let _id = fields._id;
    delete fields._id;
    addComment(_id, fields, function (err, res) {
      if (err) {
       res.sned({
         code: 500,
         msg:"服务器内部异常"
       })
        return;
      }
      res.send(res);
    })
  })
}