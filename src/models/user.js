const mongoose = require('mongoose')
const bcrypt = require('mongoose-bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    index: true,
    maxlength: 200,
    trim: true,
  },
  password: {
    type: String,
    required: false,
    bcrypt: true,
  },
  facebookId: {
    type: Number,
    required: false,
  },
}, { versionKey: false })

UserSchema.plugin(bcrypt)

module.exports = mongoose.model('User', UserSchema)
