const nodemailer = require('nodemailer')
const mailConfig = require('../utils/mailConfig')
const mailTemp = require('../services/templates/userVerificationTemp')

const sendMail = async (mailOptions) => {
    const transporter = await nodemailer.createTransport(mailConfig)
    const mail = await transporter.sendMail(mailOptions)
    return mail
}

const initiateVerificationMail = (address) => {
    return {
        from: config.mailUsername,
        to: address,
        subject: mailTemp.subject,
        html: mailTemp.message
    }
}

module.exports = {sendMail, initiateVerificationMail}