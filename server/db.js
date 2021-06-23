const pg = require('pg')
require('dotenv').config()

const connectionString =  process.env.NODE_ENV === 'test' 
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL

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
    if(!client){
      await connect()
    }
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
