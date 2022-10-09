require('dotenv').config()
const http = require('http')
const portNumber = process.env.portNumber || 8000
const app = require('./app')

http.createServer(app).listen(portNumber, () => {
  console.log(`Listenting on ${portNumber}`)
})
