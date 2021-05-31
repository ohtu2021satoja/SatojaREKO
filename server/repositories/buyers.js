const db = require("../db")

const updateNewsLetterCheck = async (id, check) => {
  console.log(id)
  await db.query("UPDATE buyers SET newsletter_check = $1 WHERE id=$2", [check, id])
}

module.exports = { updateNewsLetterCheck }