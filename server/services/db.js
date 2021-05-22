const pg = require("pg")

const connectionString = process.env.DATABASE_URL
console.log(connectionString)

const pool = new pg.Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

const client = pool.connect()

query = async (text, params) => {
  try {
    console.log(text)
    const client = await pool.connect()
    const result = await client.query(text, params)
    const results = (result) ? result.rows : null
    console.log(results)
    return results
  } catch(err) {
    console.error(err)
  }
}

module.exports = { query }