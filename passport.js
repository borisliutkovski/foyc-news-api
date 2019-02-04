const passport = require('passport')
const LocalStrategy = require('passport-local').LocalStrategy
const UserModel = require('./models/user')
const passportJWT = require('passport-jwt')
const { JWTStrategy, ExtractJWT } = passportJWT
const { jwtSecret } = require('./settings')
const bcrypt = require('bcrypt')

passport
  .use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, async (username, password, cbc) => {
    try {
      const user = await UserModel.findOne({ username }).exec()
      if (!user) return cbc(null, false, { message: 'No such user' })

      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) return cbc(null, false, { message: 'invalid password' })

      return cbc(null, user, { message: 'Success' })
    } catch (err) {
      cbc(err)
    }
  }))
  .use('signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, cbc) => {
    try {
      const user = await UserModel.create(({ username, password })).exec()
      return cbc(null, user)
    } catch (err) {
      cbc(err)
    }
  }))
  .use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  }, async (jwtPayload, cb) => {
    try {
      const user = UserModel.findById(jwtPayload.id)
      return cb(null, user)
    } catch (err) {
      cb(err)
    }
  }))
