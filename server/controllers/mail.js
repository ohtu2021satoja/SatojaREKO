const mailRouter = require('express').Router()
const mailService = require('../services/mail')
const mailConfig = require('../utils/mailConfig')


mailRouter.post('/contact', async (req, res) => {
    try {
        const mailOptions = {
            from: CUSTOMER_SERVICE_MAIL,
            to: CUSTOMER_SERVICE_MAIL,
            subject: `Message from ${req.body.email}: ${req.body.subject}`,
            text: req.body.message
        }
        await mailService.sendCustomerServiceMail(mailOptions)
        res.sendStatus(200).end()
    } catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
})

module.exports = mailRouter