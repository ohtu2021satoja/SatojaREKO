require('dotenv').config()
const CUSTOMER_SERVICE_MAIL = process.env.CUSTOMER_SERVICE_MAIL
const AUTOMATIC_MAIL = process.env.AUTOMATIC_MAIL

const testMail = {
    service: 'gmail',
    auth: {
        user: 'satojareko@gmail.com',
        pass: process.env.EMAIL_PASS
    }
}

const customerServiceConfig = {
    host: CUSTOMER_SERVICE_MAIL,
    port: 465,
    auth: {
        user: process.env.CUSTOMER_SERVICE_MAIL,
        pass: process.env.CUSTOMER_SERVICE_PASS
    }
}

const notificationConfig = {
    host: 'mail.satoja.fi',
    port: 465,
    auth: {
        user: process.env.AUTOMATIC_MAIL,
        pass: process.env.AUTOMATICMAIL_PASS
    }
}

module.exports = {customerServiceConfig, CUSTOMER_SERVICE_MAIL, AUTOMATIC_MAIL, notificationConfig, testMail}