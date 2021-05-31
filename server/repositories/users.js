const db = require("../db")

const getUser = async (id) => {
  const user = await  db.query("SELECT * from users WHERE id=$1",[id])
  return(user)
}

module.exports = { getUser }