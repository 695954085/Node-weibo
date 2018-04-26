const db = require('../model');
const { getPoints, addPoint, getAuthorInf, addComment, addLike, getSomeOnePoint, doLogin, doRegist } = require('../service');
const formidable = require('formidable');
const createError = require('http-errors')

exports.showIndex = (req, res, next) => {

}

// 得到所有的point
exports.getPointsFromServer = (req, res, next) => {
  getPoints({}, (err, docs) => {
    if (err) {
      // res.send({
      //   code: 500,
      //   msg: '服务器异常'
      // });
      next(createError(500, err));
    } else {
      res.send(docs);
    }
  })
}

// 增加point评论
exports.addPointFromClient = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    fields.date = new Date(fields.date);
    addPoint(fields, (err, result) => {
      if (err) {
        // res.send({
        //   code: 500,
        //   msg: '服务器异常'
        // })
        next(createError(500, err));
      } else {
        res.send(result);
      }
    })
  });
}

// 得到point的作者信息
exports.getAuthorInf = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    getAuthorInf(fields._id, (err, result) => {
      if (err) {
        // res.send({
        //   code: 500,
        //   msg: "服务器异常"
        // })
        next(createError(500, err));
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
    addComment(_id, fields, function (err, result) {
      if (err) {
        // console.log(err);
        // res.send({
        //   code: 500,
        //   msg: "服务器内部异常"
        // })
        next(createError(500, err));
        return;
      }
      res.send(result);
    })
  })
}

// 添加一个增加point的赞的接口
exports.addLike = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // 获取point的_id
    let _id = fields._id;
    // delete fields._id;
    addLike(_id, fields.userName, (err, result) => {
      if (err) {
        // res.send({
        //   code: 500,
        //   msg: err.message
        // })
        next(createError(500, err));
      }
      res.send(result);
    });
  });
}

//获取某人的point
exports.getSomeOnePoint = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    // 获取aid
    let aid = fields.aid;
    getSomeOnePoint(aid, function (err, points) {
      if (err) {
        // res.send({
        //   code: 500,
        //   msg: "服务器内部异常"
        // })
        next(createError(500, err));
        return;
      }
      res.send(points);
    })
  });
}

// 登录接口
exports.doLogin = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    doLogin(fields, function (err, user) {
      if (err) {
        // res.send({
        //   code: 500,
        //   msg: "服務器內部异常"
        // })
        next(createError(500, err));
        return;
      }
      // delete user.password;
      // console.log(user);
      // 
      req.session.userName = user.userName;
      res.send({
        code: 200,
        user: {
          userName: user.userName,
          img: user.img
        },
        msg: "服务器内部异常"
      })
    })
  })
}

// 註冊接口
exports.doRegist = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      next(createError(500, err));
      return;
    }
    doRegist(fields, function (err, user) {
      if (err) {
        next(createError(500, err));
        return;
      }
      req.session.userName = user.userName;
      res.send({
        code: 200,
        isLogin: true // 注册成功
      })
    })
  });
}
