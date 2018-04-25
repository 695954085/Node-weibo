const express = require('express');
const router = require('./router');
const formidable = require('formidable');
const db = require('./model/db');
const session = require('express-session')

const app = new express();
app.use(session({
  secret: 'node-weibo',
  resave: false,
  saveUninitialized: true
}))

app.post('/dologin', router.doLogin);

app.use(function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    
  }
});

app.get('/getpoints', router.getPointsFromServer);

app.post('/addpoint', router.addPointFromClient);

app.get('/getauthorinf', router.getAuthorInf);

app.post('/addcomment', router.addComment);

app.post('/addlike', router.addLike);

app.post('/getsomeonepoint', router.getSomeOnePoint);

app.listen(3000);