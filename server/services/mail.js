const nodemailer = require('nodemailer')
const mailConfig = require('../utils/mailConfig')
const mailTemp = require('../services/templates/userVerificationTemp')
const resetTemp = require('../services/templates/passwordResetTemp')

const initiateAutomaticMail = async (mailOptions) => {
    const transporter = await nodemailer.createTransport(mailConfig.notificationConfig)
    const mail = await transporter.sendMail(mailOptions)
    return mail
}

const initiateCustomerServiceMail = async (mailOptions) => {
    const transporter = await nodemailer.createTransport(mailConfig.testMail)
    const mail = await transporter.sendMail(mailOptions)
    return mail
}

const initiateVerificationMail = (address, url) => initiateTemplate(address, { url }, mailTemp)

const initiatePasswordResetMail = (address, url) => initiateTemplate(address, { url }, resetTemp)

const initiateTemplate= (address, parameters, template) => {
    console.log("Building email")
    console.log(parameters,"paremeters")
    console.log(parameters.url)
    const text = template.message(parameters)
    console.log(text)
    return{
        from: mailConfig.customerServiceConfig,
        to: address,
        subject: template.subject,
        html: text
    }
}

module.exports = {initiateVerificationMail, initiatePasswordResetMail, initiateAutomaticMail, initiateCustomerServiceMail}