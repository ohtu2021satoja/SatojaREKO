const nodemailer = require('nodemailer')
const mailConfig = require('../utils/mailConfig')
const mailTemp = require('../services/templates/userVerificationTemp')

const sendAutomaticMail = async (mailOptions) => {
    const transporter = await nodemailer.createTransport(mailConfig.customerServiceConfig)
    const mail = await transporter.sendMail(mailOptions)
    return mail
}

const sendCustomerServiceMail = async (mailOption) => {
    const transporter = await nodemailer.createTransport(mailConfig.customerServiceConfig)
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

const intiateContactServiceMail = () => {
    
}

module.exports = {sendMail, initiateVerificationMail, initiateVerificationMail}