const db = require("../../db")
const usersRepository = require("../../repositories/users")
const bcrypt = require("bcrypt")

const createUsers = async () => {
  const saltRounds = 10
  const password = await bcrypt.hash("1234", saltRounds)
  await db.query("delete from admins")
  await db.query("delete from users")
  const admin = {
    firstname: "Adminnimi",
    lastname: "AdminSukunimi",
    email: "admin@email.com",
    phonenumber: "+358854353433",
    password
  }

  const admin_id = await usersRepository.createUser(admin)
  await db.query("INSERT INTO admins VALUES($1)", [admin_id])

  const user = {
    firstname: "UserEtunimi",
    lastname: "UserSukunimi",
    email: "user@email.com",
    phonenumber: "+358854370980953433",
    password
  }

  await usersRepository.createUser(user)


}

const eraseMarkets = async () => {
  await db.query("delete from markets")
}

const eraseRekoAreas = async () => {
  await db.query("delete from reko_areas")
}

const login = async (api, cred) => {
  const response = await api
  .post("/api/auth/email")
  .send(cred)
  const cookie =  response.headers['set-cookie']
  return cookie
}

const admin_cred = {
  email: "admin@email.com",
  password: "1234"
}

const user_cred = {
  email: "user@email.com",
  password: "1234"
}

module.exports = { createUsers, eraseMarkets, admin_cred, user_cred, eraseRekoAreas, login}