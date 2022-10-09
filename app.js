// init code...
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()

app.use(require('./RouteHandling/RouteHandler'))

module.exports = app
