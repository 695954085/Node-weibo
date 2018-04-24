const mongoose = require('mongoose');

// const CommentatorSchema = require('./Commentator');

const pointSchema = new mongoose.Schema({
  "author": String,
  "text": String,
  "date": Date,
  "comments": [{
    "userName": String,
    "text": String,
    "date": Date
  }],
  "like": [String]
})

const Point = mongoose.model("points",pointSchema);

module.exports = Point;

