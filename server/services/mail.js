const nodemailer = require('nodemailer')
const mailConfig = require('../utils/mailConfig')
const mailTemp = require('../services/templates/userVerificationTemp')
const resetTemp = require('../services/templates/passwordResetTemp')

const sendMail = async (mailOptions) => {
    const transporter = await nodemailer.createTransport(mailConfig.emailConfig)
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
        from: mailConfig.ADMIN_EMAIL,
        to: address,
        subject: template.subject,
        html: text
    }
} 

module.exports = {sendMail, initiateVerificationMail, initiatePasswordResetMail}