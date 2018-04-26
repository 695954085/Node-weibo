const express = require('express');
const router = require('./router');
const formidable = require('formidable');
const db = require('./model/db');
const session = require('express-session')
const createError = require('http-errors')
const path = require('path')

const app = express();
app.use(session({
  secret: 'node-weibo',
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post('/dologin', router.doLogin);

app.post('/doregist', router.doRegist);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (req.session.userName) {
    // 正常放行
    next();
  } else {
    next(createError(404,"req.session.user is null,please login first"));
  }
});

app.get('/getpoints', router.getPointsFromServer);

app.post('/addpoint', router.addPointFromClient);

app.get('/getauthorinf', router.getAuthorInf);

app.post('/addcomment', router.addComment);

app.post('/addlike', router.addLike);

app.post('/getsomeonepoint', router.getSomeOnePoint);

// error handler
app.use(function (err, req, res, next) {
  if (err) {
    res.render("error", {
      err
    })
  } 
});

app.listen(3000);