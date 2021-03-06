const express = require('express')
const app = express()
const cors = require('cors')
const newsRouter = require('./routes/news')
const authRouter = require('./routes/auth')
const { info, error, warn } = require('./log')
const mongoose = require('mongoose')
require('./passport')
require('./db')

const db = mongoose.connection

db.on('error', err => warn('Mongo error: ', err))

const port = process.env.PORT || 3000

app.set('view engine', 'pug')
app
  .use((req, res, next) => {
    info(`${new Date().toTimeString()} ${req.url}`)
    next()
  })
  .use(cors())
  .use('/news', newsRouter)
  .use('/auth', authRouter)
  .use((err, req, res, next) => {
    error(err.stack)
    const errNum = +err.message
    if (!isNaN(errNUm)) {
      res.status(errNum).send()
      return
    }

    res.status(500).send(err.message)
    next()
  })

app.listen(port, () => info(`started on ${port}`))

module.exports = app
