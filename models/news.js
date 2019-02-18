const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    index: true,
    required: true,
  },
  author: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  content: String,
  userId: {
    type: Number,
    index: true,
  },
}, {
  versionKey: false,
})

module.exports = mongoose.model('News', NewsSchema)
