const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    index: true,
    required: true,
  },
  userId: {
    type: Number,
    index: true,
  }
}, {
  versionKey: false,
})

module.exports = mongoose.model('News', NewsSchema)
