require('dotenv').config()
const mongoose = require('mongoose')
const connection = mongoose.createConnection(process.env.dbConnectionURL)

module.exports = connection
