const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { jwtSecret } = require('../settings')
const bodyParser = require('body-parser')

const authRouter = router
  .use(bodyParser.json())
  .post('/login', (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'auth  fail',
          user: user,
        })
      }

      req.login(user, { session: false }, err => {
        if (err) return res.send(err)

        const token = jwt.sign(user, jwtSecret)
        return res.json({ user, token })
      })
    })
  })
  .post('/signUp', passport.authenticate('signup', { session: false }), (req, res, next) => {
    res.json({
      message: 'success',
      user: req.user,
    })
  })

module.exports = authRouter