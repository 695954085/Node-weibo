const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/shuoshuo')

const db = mongoose.connection;
db.once('open', () => {
  console.log('数据库成功打开')
})

module.exports = db;