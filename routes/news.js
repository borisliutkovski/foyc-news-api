/**
 * @typedef {import('mongoose').Model} Model
 */
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
/** @type {Model} */
const News = require('../models/news')
const passport = require('passport')

const newsRouter = router
  .use(bodyParser.json())
  .get('/', async (req, res) => {
    res.send(await getNews())
  })
  .get('/:id', async (req, res, next) => {
    try {
      res.send(await getNews(req.params.id))
    } catch (err) {
      next(err)
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const id = await addNews(req.body)
      res.send(id)
    } catch (err) {
      next(err)
    }
  })
  .put('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
      await updateNews(req.body)
      res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  })
  .delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
      await deleteNews(req.params.id)
      res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  })

function getNews(id) {
  if (id) {
    return News.findById(id).exec()
  } else {
    return News.find().exec()
  }
}

async function addNews(news) {
  if (typeof news !== 'object') {
    throw new Error('news must be an object')
  }

  const { _id, ...newNews } = news

  const dbNews = await News.create(newNews)

  return dbNews.id
}

async function updateNews(updatedNews) {
  const news = await News.findByIdAndUpdate(updatedNews._id, updatedNews).exec()
  if (!news) {
    throw new Error('404')
  }
}

async function deleteNews(id) {
  const news = await News.findById(id).exec()

  if (!news) {
    throw new Error('404')
  }

  return News.deleteOne({ _id: id }).exec()
}

module.exports = newsRouter
