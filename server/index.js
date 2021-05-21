const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const server = express()
const pg = require("pg")

server.use(express.json())

const pool = new pg.Pool({
  connectionString: connectionString,
  ssl: true
})

server.get('/', (req, res) => {
  res.send("hello world")
})

server.get("/db", async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM test_table")
    const results = {" results": (result) ? result.rows : null}
    res.render("pages/db", results)
    client.release()
  } catch(err) {
    console.error(err)
    res.send("Error" + err)
  }
})

server.use(middleware.unknownEndpoint)
server.use(middleware.errorHandler)

var connectionString = process.env.DATABASE_URL




server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
