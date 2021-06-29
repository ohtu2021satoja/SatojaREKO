const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)
const usersRepository = require("./repositories/users")
const bcrypt = require("bcrypt")
const db = require("./db")

const func = async () => {
  const saltRounds = 10
  const password = await bcrypt.hash("12345678", saltRounds)
  await db.query("delete from admins")
  await db.query("delete from users")
  const admin = {
    firstname: "Touko",
    lastname: "Puro",
    email: "puro.touko@gmail.com",
    phonenumber: "+358854353",
    password
  }

  await usersRepository.createUser(admin)
}

func()


server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})