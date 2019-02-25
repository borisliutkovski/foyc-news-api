const mongoose = require('mongoose')
const config = require('../config')

switch (process.env.NODE_ENV) {
  case 'production':
  case 'development':
    mongoose.connect(config.dbConnectionString)
    break
  case 'test': {
    const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer
    const mongoServer = new MongoMemoryServer()
    mongoServer.getConnectionString()
      .then(mongoUri => {
        mongoose.connect(mongoUri)
      })
  }
}
