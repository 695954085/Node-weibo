const express = require('express');
const router = require('./router');
const formidable = require('formidable');
const db = require('./model/db');

const app = new express();

app.get('/getpoints',router.getPointsFromServer);

app.post('/addpoint',router.addPointFromClient);

app.get('/getauthorinf',router.getAuthorInf);

app.post('/addcomment',router.addComment);

app.listen(3000);