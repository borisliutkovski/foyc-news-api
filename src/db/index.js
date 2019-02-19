const mongoose = require('mongoose')
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer
const config = require('../config')

switch (process.env.NODE_ENV) {
  case 'production':
  case 'development':
    mongoose.connect(config.dbConnectionString)
    break
  case 'test': {
    const mongoServer = new MongoMemoryServer()
    mongoServer.getConnectionString()
      .then(mongoUri => {
        mongoose.connect(mongoUri)
      })
  }
}
