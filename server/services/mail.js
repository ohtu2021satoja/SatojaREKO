const nodemailer = require('nodemailer')
const mailConfig = require('../utils/mailConfig')
const mailTemp = require('../services/templates/userVerificationTemp')
const resetTemp = require('../services/templates/passwordResetTemp')

const sendTestMail = async (mailOptions) =>  sendMail(mailOptions, testConfig)

 const sendCustomerMail = async (mailOptions) => sendMail(mailOptions, mailConfig.testMail)


const sendMail = async (mailOptions, config) => {
    const transporter = await nodemailer.createTransport(config)
    const mail = await transporter.sendMail(mailOptions)
    return mail
}

const initiateVerificationMail = (address, url) => initiateTemplate(address, { url }, mailTemp)

const initiatePasswordResetMail = (address, url) => initiateTemplate(address, { url }, resetTemp)

const sendReminderMails = (allevents) => {
    allevents.forEach((eventObject) => {
        sendEventReminderMails(eventsObject.user, eventObject.event)
    })
}

const sendEventReminderMails = (users,event) => {
    users.forEach((user) => {
        if(user.is_seller){
            sendAutomaticMail(initiatSellerReminderMail(user.address, { url: "satoja", event, user}))
        }else{
            sendAutomaticMail(initiateBuyerReminderMail(user.address, { url: "satoja", event, user }))
        }
        
    })
}


parameters.event
parameters.url
parameters.user

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