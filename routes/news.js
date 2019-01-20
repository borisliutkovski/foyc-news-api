const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const newsRouter = router
  .use(bodyParser.json())
  .get('/', (req, res) => {
    res.send(getNews())
  })
  .get('/:id', (req, res, next) => {
    try {
      res.send(getNews(req.params.id))
    } catch (err) {
      next(err)
    }
  })
  .post('/', (req, res, next) => {
    try {
      const id = addNews(req.body)
      res.send(id)
    } catch (err) {
      next(err)
    }
  })
  .put('/:id', (req, res, next) => {
    try {
      updateNews(req.body)
      res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  })
  .delete('/:id', (req, res, next) => {
    try {
      deleteNews(req.params.id)
      res.sendStatus(200)
    } catch (err) {
      next(err)
    }
  })

let newsStorage = [
  {
    id: '23e23aet',
    title: 'Article about politics',
  },
  {
    id: '346thjbkxdfg',
    title: 'Whatever i cant be bothered',
  },
]

function getNews(id) {
  if (id) {
    const news = newsStorage.find(news => news.id === id)
    if (!news) throw new Error('404')

    return news
  }

  return newsStorage
}

function addNews(news) {
  if (typeof news !== 'object') {
    throw new Error('news must be an object')
  }

  news = { ...news, id: createId() }
  newsStorage = [...newsStorage, news]

  return news.id
}

function updateNews(updatedNews) {
  if (!newsStorage.find(({ id }) => updatedNews.id === id)) {
    throw new Error('404')
  }

  newsStorage = newsStorage.map(oldNews =>
    oldNews.id === updatedNews.id ? updatedNews : oldNews)
}

function deleteNews(id) {
  if (!newsStorage.find(oldNews => oldNews.id === id)) {
    throw new Error('404')
  }

  newsStorage = newsStorage.filter(oldNews => oldNews.id !== id)
}

/**
 * stolen
 */
function createId() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

module.exports = newsRouter
