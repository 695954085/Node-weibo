const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  "userName": String,
  "password": String,
  "avatar": String,
  "token": String
})

// 校验用户输入密码是否正确
// userSchema.methods.comparePassword = function (password, callback) {
//   bcrypt.compare(password, this.password, (err, isMatch) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(null, isMatch);
//   })
// }
userSchema.method("comparePassword", function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  })
});

//索引？
// userSchema.index({"userName":1});

//model
const User = mongoose.model('user', userSchema);

//添加用户保存时中间件对password进行bcrypt加密，这样保证用户密码只有用户本人知道
userSchema.pre('save', function (next) {
  let user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      })
    });
  } else {
    return next();
  }
})

// 1. 获取

module.exports = User;
