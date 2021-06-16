const mailRoute = require('express').Router()
const mailService = require('../services/mail')

mailRoute.post('/news', async (req, res) => {
    try {
    } catch(err) {
        console.log(err)
        res.sendStatus(400)
    }
})

module.exports = mailRoute