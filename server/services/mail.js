const nodemailer = require('nodemailer')
const mailConfig = require('../utils/mailConfig')
const mailTemp = require('../services/templates/userVerificationTemp')
const resetTemp = require('../services/templates/passwordResetTemp')
const cancelTemp = require('../services/templates/orderCancelTemp')
const reminderTemp = require('../services/templates/eventReminderTemp')

const sendTestMail = async (mailOptions) =>  sendMail(mailOptions, mailConfig.testMail)
const sendCustomerMail = async (mailOptions) => sendMail(mailOptions, mailConfig.customerServiceConfig)
const sendAutomaticMail = async (mailOptions) => sendMail(mailOptions, mailConfig.notificationConfig)

const sendMail = async (mailOptions, config) => {
    const transporter = await nodemailer.createTransport(config)
    const mail = await transporter.sendMail(mailOptions)
    return mail
}

const initiateVerificationMail = (address, url) => initiateTemplate(address, { url }, mailTemp, mailConfig.notificationConfig)
const initiatePasswordResetMail = (address, url) => initiateTemplate(address, { url }, resetTemp, mailConfig.notificationConfig)
const initiateSellerReminderMail = (address, url, events, users) => initiateTemplate(address, parameters, reminderTemp.sellerMessage, mailConfig.notificationConfig)
const initiateBuyerReminderMail = (address, url, events, users) => initiateTemplate(address, parameters, reminderTemp.buyerMessage, mailConfig.notificationConfig)
const initiateDeleteOrder = async (address, seller, user, event, batches) => await initiateTemplate(address, {seller, user, event, batches, url:"https://satoja-reko.herokuapp.com"}, cancelTemp, mailConfig.testMail)

const initiateTemplate= async (address, parameters, template, config) => {
    console.log("Building email")
    console.log(parameters,"paremeters")
    console.log(parameters.url)
    const text = await template.message(parameters)
    console.log(text)
    return{
        from: config.auth.user,
        to: address,
        subject: template.subject,
        html: text
    }
}

const sendReminderMails = (allevents) => {
    allevents.forEach((eventObject) => {
        sendEventReminderMails(eventsObject.user, eventObject.event)
    })
}

const sendEventReminderMails = (users,event) => {
    users.forEach((user) => {
        if(user.is_seller){
            sendAutomaticMail(initiatSellerReminderMail(user.address, { url: "https://satoja-reko.herokuapp.com/", event, user}))
        }else{
            sendAutomaticMail(initiateBuyerReminderMail(user.address, { url: "https://satoja-reko.herokuapp.com/", event, user }))
        }
    })
}

module.exports = {initiateVerificationMail, initiatePasswordResetMail, initiateDeleteOrder, sendTestMail}