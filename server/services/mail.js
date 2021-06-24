const nodemailer = require('nodemailer')
const mailConfig = require('../utils/mailConfig')
const mailTemp = require('../services/templates/userVerificationTemp')
const resetTemp = require('../services/templates/passwordResetTemp')
const cancelTemp = require('../services/templates/orderCancelTemp')
const reminderTemp = require('../services/templates/eventReminderTemp')

const sendTestMail = async (mailOptions) =>  {
    console.log("sending test mail")
    await sendMail(mailOptions, mailConfig.testMail)
}

const sendCustomerMail = async (mailOptions) => sendMail(mailOptions, mailConfig.customerServiceConfig)
const sendAutomaticMail = async (mailOptions) => sendMail(mailOptions, mailConfig.notificationConfig)

const sendMail = async (mailOptions, config) => {
    console.log(mailOptions)
    const transporter = await nodemailer.createTransport(config)
    const mail = await transporter.sendMail(mailOptions)
    return mail
}

const initiateVerificationMail = (address, url) => initiateTemplate(address, { url }, mailTemp, mailConfig.notificationConfig)
const initiatePasswordResetMail = (address, url) => initiateTemplate(address, { url }, resetTemp, mailConfig.notificationConfig)
const initiateSellerReminderMail = async (address, url, event, user) => await initiateTemplate(address, {is_seller: true, url, event, user}, reminderTemp, mailConfig.testMail)
const initiateBuyerReminderMail = async (address, url, event, user) => await initiateTemplate(address, {is_seller: false, url, event, user}, reminderTemp, mailConfig.testMail)
const initiateDeleteOrder = async (address, seller, user, event, batches) => await initiateTemplate(address, {seller, user, event, batches, url:"https://satoja-reko.herokuapp.com"}, cancelTemp, mailConfig.testMail)

const initiateTemplate= async (address, parameters, template, config) => {
    const text = await template.message(parameters)
    const res = {
        from: config.auth.user,
        to: address,
        subject: template.subject,
        html: text
    }
    return res
}

const sendReminderMails = async (allevents) => {
    console.log(allevents)
    await allevents.forEach((eventObject) => {
        sendEventReminderMails(eventObject.buyers, eventObject.sellers, eventObject.event)
     })
}

const sendEventReminderMails = async (buyers,sellers, event) => {
    if(buyers){
        for(const i in buyers){
            buyer = buyers[i]
            sendAutomaticMail(await initiateBuyerReminderMail(buyer.email, "https://satoja-reko.herokuapp.com", event, buyer ))
        }
    }
    if(sellers){
        for(const i in sellers){
            seller = sellers[i]
            sendAutomaticMail(await initiateBuyerReminderMail(seller.email, "https://satoja-reko.herokuapp.com", event, seller ))
        }
    }

}

module.exports = {initiateVerificationMail, initiatePasswordResetMail, initiateDeleteOrder, sendTestMail, sendReminderMails, sendAutomaticMail}