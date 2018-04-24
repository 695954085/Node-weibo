const mongoose = require('mongoose');

const CommentatorSchema = require('./Commentator');

const pointSchema = new mongoose.Schema({
  "author": String,
  "text": String,
  "date": Date,
  "comments": [CommentatorSchema],
  "like": [String]
})

