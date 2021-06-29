const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)
const bcrypt = require("bcrypt")

// const func = async () => {
//   const saltRounds = 10
//   const password = await bcrypt.hash("12345678", saltRounds)
//   const admin = {
//     firstname: "Miia",
//     lastname: "Mehulinko",
//     email: "miia.mehulinko@marjatilastokeskus.fi",
//     phonenumber: "505050505050",
//     password
//   }

//   await usersService.createUser(admin, usersRepository, sellersRepository, buyersRepository)
// }

// func()

console.log("LOL")

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})