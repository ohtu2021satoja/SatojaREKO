require("dotenv").config()

let PORT = process.env.PORT || 3003
let FB_CLIENT_ID = process.env.FB_CLIENT_ID
let FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET

let SERVER_HOSTNAME =
  process.env.MODE === "production"
    ? "satoja-reko.herokuapp.com"
    : "satoja-staging.herokuapp.com"

console.log("SERVER_HOSTNAME: ", SERVER_HOSTNAME)
console.log("process.env.MODE: ", process.env.MODE)

module.exports = {
  PORT,
  FB_CLIENT_ID,
  FB_CLIENT_SECRET,
  SERVER_HOSTNAME,
}
