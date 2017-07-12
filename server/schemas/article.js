/**
 * Created by Administrator on 2017/7/12.
 */
var mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  title: String,
  // 关联字段 - 分类id
  category: {
    // 引用
    ref: 'Category',
    // 类型
    type: mongoose.Schema.Types.ObjectId
  },
  user: {
    // 引用
    ref: 'User',
    // 类型
    type: mongoose.Schema.Types.ObjectId
  },
  addTime: {
    type: Date,
    default: new Date()
  },
  // 阅读量
  views: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  message: {
    type: Array,
    default: []
  }
})
