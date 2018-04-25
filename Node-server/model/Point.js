const mongoose = require('mongoose');

// const CommentatorSchema = require('./Commentator');

const pointSchema = new mongoose.Schema({
  "author": String,
  "aid": String,
  "text": String,
  "date": Date,
  "comments": [{
    "_id": false,
    "userName": String,
    "text": String,
    "date": Date
  }],
  "like": [String]
})

const Point = mongoose.model("points", pointSchema);

module.exports = Point;

