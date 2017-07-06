/**
 * Created by Administrator on 2017/7/6.
 */
const mongoose = require('mongoose')

const UserSchema = require('../schemas/user')

module.exports = mongoose.model('User', UserSchema)
