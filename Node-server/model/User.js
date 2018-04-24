const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  "userName": String,
  "password": String,
  "img": String,
})

//索引？
// userSchema.index({"userName":1});

//model
const User = mongoose.model('user', userSchema);

// 1. 获取

module.exports = User;
