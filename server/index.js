const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const server = express()
const pg = require("pg")

server.use(express.json())

server.get('/', (req, res) => {
  res.send("hello world")
})

server.use(middleware.unknownEndpoint)
server.use(middleware.errorHandler)

var connectionString = process.env.DATABASE_URL

const pool = new pg.Pool({
  connectionString: connectionString,
  ssl: true
})

pool.connect(function(err, client, done) {
  console.log(err, client, done)
});

pool.end()

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})