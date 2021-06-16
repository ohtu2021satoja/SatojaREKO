const passport = require('passport')
const authRouter = require('express').Router()
const mailService = require('../services/mail')
const usersService = require("../services/users")
const usersRepository = require("../repositories/users")
const buyersRepository = require("../repositories/buyers")
const sellersRepository = require("../repositories/sellers")


// auth with facebook
authRouter.get('/facebook', passport.authenticate('facebook'))

// callback route for facebook redirect
authRouter.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/fail' }), (req, res) => {
    // Successful authentication, redirect home.
    console.log('success')
    res.redirect('/api/auth/success')
})

authRouter.post("/email", passport.authenticate('local', {
  successRedirect: "api/auth/success",
  failureRedirect: "/",
  failureMessage: true
}), (req, res) => {
  // Successful authentication, redirect home.
  console.log('success')
  res.redirect('/auth/success')
})

authRouter.post("/email/register", async (req, res) => {
  const {firstname, lastname, email, password, phonenumber} = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const url = `http://localhost:3003/api/auth/email/verify/${firstname}/${lastname}/${email}/${passwordHash}/${phonenumber}`
  await mailService.sendMail(mailService.initiateVerificationMail('puro.touko@gmail.com',url))
})

authRouter.get("/email/verify/:firstname/:lastname/:email/:password/:phonenumber", async (req, res) => {
  await usersService.createUser(req.params, usersRepository, sellersRepository, buyersRepository )
  res.send("Ok")
})
authRouter.get('/success', (req, res) => {
  console.log('successfully logged in', req.user)
  res.redirect("/")
})

authRouter.get('/logout', (req, res) => {
  console.log('===============> logout')
  req.logout()
  res.redirect('/')
})

authRouter.get('/notauth', (req, res) => {
  res.send("not authenticated")
})

module.exports = authRouter