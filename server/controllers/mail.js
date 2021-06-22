const mailRouter = require('express').Router()
const mailService = require('../services/mail')
const mailConfig = require('../utils/mailConfig')


mailRouter.post('/contact', async (req, res) => {
    const mailOptions = {
        from: 'satojareko@gmail.com',
        to: 'satojareko@gmail.com',
        subject: `Message from ${req.body.subject}: ${req.body.name}: ${req.body.email}`,
        text: req.body.message
    }
    
    try {
        await mailService.initiateCustomerServiceMail(mailOptions)
        res.send("success").end()
    } catch(err) {
        res.status(404).send("error").end()
    }
})

module.exports = mailRouter