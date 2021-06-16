const nodemailer = require('nodemailer')
const mailConfig = require('../utils/mailConfig')
const mailTemp = require('../services/templates/userVerificationTemp')

const sendMail = async (mailOptions) => {
    const transporter = await nodemailer.createTransport(mailConfig.emailConfig)
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

module.exports = {sendMail, initiateVerificationMail}