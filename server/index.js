const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const server = express()
const test = require("./repositories/test")

server.use(express.json())

server.get('/', (req, res) => {
  res.send("hello world")
})

server.use(middleware.unknownEndpoint)
server.use(middleware.errorHandler)

server.listen(config.PORT, () => {
  test.now()
  console.log(`Server running on port ${config.PORT}`)
})