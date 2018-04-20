const db = require('../model');
const { getPoints, addPoint } = require('../service');
const formidable = require('formidable');

exports.showIndex = (req, res, next) => {

}

exports.getPointsFromServer = (req, res, next) => {
  getPoints('points', {}, (err, docs) => {
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
    addPoint('points', fields, (err, result) => {
      if(err){
        res.send({
          code:500,
          msg:'服务器异常'
        })
      }else{
        res.send(result);
      }
    })
  });
}