const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { jwtSecret } = require('../config')
const bodyParser = require('body-parser')

const authRouter = router
  .use(bodyParser.json())
  .post('/login', (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info.message,
          user: user,
        })
      }

      const payload = {
        username: user.username,
        _id: user._id,
      }

      const token = jwt.sign(payload, jwtSecret)
      return res.json({ payload, token })
    })(req, res, next)
  })
  .post('/signup', passport.authenticate('signup', { session: false }), (req, res, next) => {
    res.json({
      message: 'success',
      user: req.user,
    })
  })
  .post('/logout', (req, res) => {
    req.logout()
    res.status(200).send()
  })
  .get('/facebook', passport.authenticate('facebook'))
  .get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/login', successRedirect: '/' }))

module.exports = authRouter
