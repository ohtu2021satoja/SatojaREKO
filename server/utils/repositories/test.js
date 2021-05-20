const { Pool, Client } = require('pg')
const connectionString = process.env.DATABASE_URL
const pool = new Pool({
  connectionString,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
const now = async () => {
  const client = await new Client({
    connectionString,
  })
  await client.connect()
  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
  })
}

modules.exports = { now }