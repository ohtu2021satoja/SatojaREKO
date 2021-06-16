require('dotenv').config()
const ADMIN_EMAIL = 'satojareko@gmail.com'

const emailConfig = {
    service: 'gmail',
    auth: {
        user: ADMIN_EMAIL,
        pass: process.env.EMAIL_PASS
    }
}

module.exports = {emailConfig, ADMIN_EMAIL}