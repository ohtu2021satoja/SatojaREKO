require('dotenv').config()

let PORT = process.env.PORT || 3003
let FB_CLIENT_ID = process.env.FB_CLIENT_ID
let FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET

module.exports = {
    PORT,
    FB_CLIENT_ID,
    FB_CLIENT_SECRET
}