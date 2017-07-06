/**
 * Created by Administrator on 2017/7/6.
 */
const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  account: String,
  password: String
})

