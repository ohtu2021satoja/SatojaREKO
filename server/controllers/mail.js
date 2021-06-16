const mailRouter = require('express').Router()
const mailService = require('../services/mail')

mailRouter.get('/news', async (req, res) => {
    try {
        await mailService.sendMail(mailService.initiateVerificationMail(''))
        res.sendStatus(200).end()
    } catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
})

mailRouter.get('/', (req,res) => {
    res.send('OK')
})

module.exports = mailRouter