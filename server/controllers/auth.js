const passport = require('passport')
const authRouter = require('express').Router()

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