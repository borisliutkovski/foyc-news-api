const dev = require('./dev.json')
const prod = require('./prod.json')
const test = require('./test.json')

let currentConfig

switch (process.env.NODE_ENV) {
  case 'production': currentConfig = prod
    break
  case 'development': currentConfig = dev
    break
  case 'test': currentConfig = test
    break
}

module.exports = currentConfig
