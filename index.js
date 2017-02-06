'use strict'

const pkg = require('./package.json')
const debug = require('debug')(`${pkg.name}:boot`)
const secretsFile = require('./musicmachine.env');

// This loads a secrets file from
//   or ~/.musicmachine.env.json
// and add it to the environment
const env = Object.create(process.env)
try {
  Object.assign(env, secretsFile)
} catch (error) {
  debug('%s: %s', secretsFile, error.message)
  debug('%s: env file not found or invalid, moving on', secretsFile)
}

// sets our server port for development
const PORT = process.env.PORT || 1337

module.exports = {
  get name() { return pkg.name },
  get isTesting() { return !!global.it },
  get isProduction() {
    return process.env.NODE_ENV === 'production'
  },
  get baseUrl() {
    return env.BASE_URL || `http://localhost:${PORT}`
  },
  get port() {
    return env.PORT || 1337
  },
  package: pkg,
  env,
}
