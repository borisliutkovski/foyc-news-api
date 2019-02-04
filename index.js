const express = require('express')
const app = express()
const newsRouter = require('./routes/news')
const { info, error } = require('./log')
const { dbConnectionString } = require('./settings')
const mongoose = require('mongoose')
require('./passport')

mongoose.connect(dbConnectionString)
const db = mongoose.connection

db.on('error', err => error('Mongo error: ', err))

const port = 3000

app.set('view engine', 'pug')
app
  .use((req, res, next) => {
    info(`${new Date().toTimeString()} ${req.url}`)
    next()
  })
  .use('/news', newsRouter)
  .use((err, req, res, next) => {
    error(err.stack)
    if (err.message === '404') {
      res.status(404).render('error', { title: 'Not found', message: 'Not found' })
    } else {
      res.status(500).send(err.message)
    }

    next()
  })

app.listen(port, () => info(`started on ${port}`))
