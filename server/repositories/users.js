const db = require('../db')

const getUser = async (id) => {
  const user = await  db.query("SELECT *, (SELECT users.id IN (SELECT id from admins)) AS is_admin, users.id, sellers.image_url AS sellers_image_url, buyers.image_url as buyers_image_url, (SELECT json_agg(json_build_object('id',reko_areas.id, 'name', reko_areas.name, 'belongs',reko_areas.id IN (SELECT sellers_reko.reko_area_id from sellers_reko WHERE sellers_reko.seller_id = $1))) from reko_areas) AS reko_areas from users LEFT JOIN buyers ON buyers.id = users.id LEFT JOIN sellers ON sellers.id = users.id WHERE users.id=$1",[id])
  return(user[0])
}

const getUserByEmail = async (email) => {
  const user = await  db.query("SELECT * from users WHERE users.email=$1",[email])
  return(user[0])
}

const getUserById = async (id) => {
  const user = await  db.query("SELECT * from users WHERE id=$1 OR facebook_id=$1",[id])
  return(user[0])
}


const updateUsersInfo = async (user_id, user_info) => {
  await db.query("UPDATE users SET firstname=$1, lastname=$2, phonenumber=$3, email=$4 WHERE id=$5", [user_info.firstname, user_info.lastname, user_info.phonenumber, user_info.email, user_id] )
}

const createUser = async (params) => {
  const current_date = new Date()
  const user_id = await db.query("INSERT INTO users VALUES (DEFAULT, $1, $2, $7, $3, $4, $5, $6) Returning id;", [params.firstname, params.lastname, params.phonenumber, params.email, params.password, params.facebook_id, current_date])
  return(user_id[0].id)
}

const deleteUser = async (id) => {
  await db.query("DELETE FROM users WHERE id=$1", [id])
}

const setUserPassword = async (id, passwordHash) => {
  await db.query("UPDATE users SET password=$1 WHERE id=$2", [passwordHash, id])
} 
 
const getUserByEmailOrId = async (id, email) => {
  const user = await db.query("SELECT * from users WHERE id=$1 OR facebook_id=$1 OR email=$2", [id, email])
  return (user[0])
}

const isAdmin = async (user) => {
  const isAdmin = await db.query("select users.id IN (select id from admins) AS is_admin from users WHERE users.id=$1;", [user])
  console.log(isAdmin)
  return(isAdmin[0].is_admin)
}

const getOrderUser = async (order_id) => {
  const user = await db.query("SELECT * from buyers INNER JOIN orders ON buyers.id = orders.buyers_id INNER JOIN users ON buyers.id = users.id WHERE orders.id=$1", [order_id])
  return(user[0])
}

module.exports = { getUser, updateUsersInfo, createUser, getUserByEmail, getUserById, deleteUser, setUserPassword, getUserByEmailOrId, isAdmin, getOrderUser}
