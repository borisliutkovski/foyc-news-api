const express = require('express')
const app = express()
const newsApi = require('./newsApi')
const { info, error } = require('./log')
const bodyParser = require('body-parser')

const port = 3000

app.set('view engine', 'pug')
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    info(`${new Date().toTimeString()} ${req.url}`)
    next()
  })

app
  .get('/news', (req, res) => {
    res.send(newsApi.getNews())
  })
  .get('/news/:id', (req, res) => {
    res.send(newsApi.getNews(req.params.id))
  })
  .post('/news', (req, res) => {
    const id = newsApi.addNews(req.body)
    res.send(id)
  })
  .put('/news/:id', (req, res) => {
    newsApi.updateNews(req.body)
    res.sendStatus(200)
  })
  .delete('/news/:id', (req, res) => {
    newsApi.deleteNews(req.params.id)
    res.sendStatus(200)
  })

app.use((err, req, res, next) => {
  error(err.stack)
  if (err.message === '404') {
    res.status(404).render('error', { title: 'Not found', message: 'Not found' })
  } else {
    res.status(500).render('error', { title: 'Error', message: 'Error' })
  }

  next()
})

app.listen(port, () => info(`started on ${port}`))
