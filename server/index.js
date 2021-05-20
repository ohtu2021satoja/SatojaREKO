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
  if(err) console.log(err)
   client.query('SELECT * FROM your_table', function(err, result) {
      done();
      if(err) return console.error(err);
      console.log(result.rows);
   });
});

pool.end()

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})