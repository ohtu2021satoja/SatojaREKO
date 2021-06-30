const mailRouter = require('express').Router()
const mailService = require('../services/mail')
const mailConfig = require('../utils/mailConfig')


mailRouter.post('/contact', async (req, res) => {
    if(!req.user){
        res.status(401).send("Not logged in")
    }
    try {
        const mailOptions = await mailService.initiateCustomerMail(req.body)
        await mailService.sendCustomerMail(mailOptions)
        res.send("success").end()
    } catch(err) {
        res.status(404).send("error").end()
    }
})

module.exports = mailRouter