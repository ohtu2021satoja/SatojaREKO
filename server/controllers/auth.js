const passport = require('passport')
const authRouter = require('express').Router()
const mailService = require('../services/mail')
const usersService = require("../services/users")
const usersRepository = require("../repositories/users")
const buyersRepository = require("../repositories/buyers")
const sellersRepository = require("../repositories/sellers")

const bcrypt = require("bcrypt")


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
  user = await usersService.getUserByEmail(email, usersRepository)
  console.log(user)
  if(user){
    if(user.password){
      res.send("User has been registered with email already")
    } else{
      await usersService.setUserPassword(user.id, password, usersRepository)
      res.send("We found user with your email and added password to that")
    }
  } else{
    const url = `http://localhost:3003/api/auth/email/verify?firstname=${firstname}&lastame=${lastname}&email=${email}&password=${passwordHash}&phonenumber=${phonenumber}`
    await mailService.sendMail(mailService.initiateVerificationMail(email,url))
    res.send(`Verification email has been sent to ${email}`)
  }
})

authRouter.post("/email/reset_password", async (req, res) => {
  const { email, password } = req.body
  const user = await usersService.getUserByEmail(email, usersRepository)
  if(!user){
    res.status(400).send("No user with that email")
  } else{
    console.log("USER",user)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const url = `http://localhost:3003/api/users/${user.id}/reset_password?passwordHash=${passwordHash}`
    await mailService.sendMail(mailService.initiatePasswordResetMail(email,url))
    res.send(`Resetting email has been sent to ${email}`)
  }
})

authRouter.get("/email/verify", async (req, res) => {
  await usersService.createUser(req.query, usersRepository, sellersRepository, buyersRepository )
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