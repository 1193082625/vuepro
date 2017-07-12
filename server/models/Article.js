/**
 * Created by Administrator on 2017/7/12.
 */
var mongoose = require('mongoose')

var articleSchema = require('../schemas/article')

module.exports = mongoose.model('Article', articleSchema)

