require('dotenv').config()
const CUSTOMER_SERVICE_MAIL = process.env.CUSTOMER_SERVICE_MAIL

const customerServiceConfig = {
    host: 'mail.satoja.fi',
    port: 465,
    auth: {
        user: process.env.CUSTOMER_SERVICE_MAIL,
        pass: process.env.EMAIL_PASS
    }
}

module.exports = {customerServiceConfig, CUSTOMER_SERVICE_MAIL}