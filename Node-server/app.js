const express = require('express');
const router = require('./router');
const formidable = require('formidable');

const app = new express();

app.get('/getpoints',router.getPointsFromServer);

app.post('/addpoint',router.addPointFromClient);

app.listen(3000);