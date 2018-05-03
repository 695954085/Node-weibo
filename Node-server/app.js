const express = require('express');
const router = require('./router');
const formidable = require('formidable');
const db = require('./model/db');
const session = require('express-session')
const createError = require('http-errors')
const path = require('path')
const morgan = require('morgan') // 命令行log显示
const passport = require('passport')
require('./passport/passport')(passport)

const app = express();
app.use(session({
  secret: 'node-weibo',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post('/doregister', router.doRegister);

app.post('/dologin', router.doLogin);

app.use(express.static('./public'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (req.session.userName) {
    // 正常放行
    next();
  } else {
    next(createError(404, "req.session.user is null,please login first"));
  }
});

app.get('/getpoints', passport.authenticate("bearer", {
  session: false
}), router.getPointsFromServer);

app.post('/addpoint', passport.authenticate("bearer", {
  session: false
}), router.addPointFromClient);

app.post('/getauthorinf', passport.authenticate("bearer", {
  session: false
}), router.getAuthorInf);

app.post('/addcomment', passport.authenticate("bearer", {
  session: false
}), router.addComment);

app.post('/addlike', passport.authenticate("bearer", {
  session: false
}), router.addLike);

app.post('/getsomeonepoint', passport.authenticate("bearer", {
  session: false
}), router.getSomeOnePoint);

app.post('/getfriendlist', passport.authenticate("bearer", {
  session: false
}), router.getFriendList);

// error handler
app.use(function (err, req, res, next) {
  if (err) {
    res.status(err.status || 500);
    res.send(err);
  }
});

app.listen(3000);