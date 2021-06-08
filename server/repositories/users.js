const db = require("../db")

const getUser = async (id) => {
  const user = await  db.query("SELECT users.firstname from users INNER JOIN sellers ON sellers.id = users.id INNER JOIN buyers ON buyers.id = users.id WHERE id=$1",[id])
  return(user)
}

const updateUsersInfo = async (user_id, user_info) => {
  await db.query("UPDATE users SET firstname=$1, lastname=$2, phonenumber=$3, email=$4 WHERE id=$5", [user_info.firstname, user_info.lastname, user_info.phonenumber, user_info.email, user_id] )
}

module.exports = { getUser, updateUsersInfo }