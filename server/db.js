const pg = require('pg')

const connectionString = process.env.DATABASE_URL
console.log(connectionString)

const pool = new pg.Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

let client

const connect = async () => {
  client = await pool.connect()
}

connect()

beginTransaction = async () => {
  await client.query("BEGIN")
}

endTransaction = async () => {
  await client.query("COMMIT")
}

rollBack = async () => {
  await client.query("ROLLBACK")
} 

query = async (text, params) => {
  try {
    const result = await client.query(text, params)
    const results = (result) ? result.rows : null
    console.log(results)
    return results
  } catch(err) {
    console.error(err)
    throw err
  }
}

module.exports = { query, beginTransaction, endTransaction, rollBack }
