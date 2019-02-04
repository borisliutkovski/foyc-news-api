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

        const payload = {
          username: user.username,
          _id: user._id,
        }

        const token = jwt.sign(payload, jwtSecret)
        return res.json({ payload, token })
      })
    })(req, res, next)
  })
  .post('/signup', passport.authenticate('signup', { session: false }), (req, res, next) => {
    res.json({
      message: 'success',
      user: req.user,
    })
  })
  .get('/facebook', passport.authenticate('facebook'))
  .get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/login', successRedirect: '/' }))

module.exports = authRouter
