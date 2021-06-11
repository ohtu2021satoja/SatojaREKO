const db = require('../db')
const {isEmpty} = require('../utils/validation')

const getUser = async (id) => {
  const user = await  db.query("SELECT *, sellers.image_url AS sellers_image_url, buyers.image_url as buyers_image_url, (SELECT json_agg(json_build_object('id',reko_areas.id, 'name', reko_areas.name, 'belongs',reko_areas.id IN (SELECT sellers_reko.reko_area_id from sellers_reko WHERE sellers_reko.seller_id = $1))) from reko_areas) AS reko_areas from users INNER JOIN buyers ON buyers.id = users.id INNER JOIN sellers ON sellers.id = users.id WHERE users.id=$1",[id])
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
  await db.query("INSERT INTO users VALUES (DEFAULT, $1, $2, $9, $3, $4, $5, $6, $7, $8);", [params.firstname, params.lastname, params.phonenumber, params.email, params.password, false, false, params.facebook_id, current_date])
}
const setAsBuyer = async (id) => {
  await db.query("UPDATE users SET is_buyer=true WHERE id=$1", [id])
}

const setAsSeller = async (id) => {
  await db.query("UPDATE users SET is_seller=true WHERE id=$1", [id])
}

module.exports = { getUser, updateUsersInfo, createUser, setAsBuyer, setAsSeller, getUserByEmail, getUserById}
