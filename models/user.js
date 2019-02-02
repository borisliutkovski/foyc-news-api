const mongoose = require('mongoose')
const bcrypt = require('mongoose-bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    maxlength: 200,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
  },
}, { versionKey: false })

UserSchema.plugin(bcrypt)

module.exports = mongoose.model('User', UserSchema)
