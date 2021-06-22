const nodemailer = require('nodemailer')
const mailConfig = require('../utils/mailConfig')
const mailTemp = require('../services/templates/userVerificationTemp')

const initiateAutomaticMail = async (mailOptions) => {
    const transporter = await nodemailer.createTransport(mailConfig.customerServiceConfig)
    const mail = await transporter.sendMail(mailOptions)
    return mail
}

const initiateCustomerServiceMail = async (mailOptions) => {
    const transporter = await nodemailer.createTransport(mailConfig.testMail)
    const mail = await transporter.sendMail(mailOptions)
    return mail
}

const initiateVerificationMail = (address, url) => {
    const text = mailTemp.message(url)
    return {
        from: mailConfig.ADMIN_EMAIL,
        to: address,
        subject: mailTemp.subject,
        html: text
    }
}

module.exports = {initiateAutomaticMail, initiateCustomerServiceMail, initiateVerificationMail}