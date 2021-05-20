const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.send("hello world")
})

server.use(middleware.unknownEndpoint)
server.use(middleware.errorHandler)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})