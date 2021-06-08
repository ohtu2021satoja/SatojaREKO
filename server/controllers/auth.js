const passport = require('passport')
const authRouter = require('express').Router()

// auth with facebook
authRouter.get('/facebook', passport.authenticate('facebook'))

// callback route for facebook redirect
authRouter.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/fail' }), (req, res) => {
    // Successful authentication, redirect home.
    console.log('success')
    res.redirect('/auth/success')
})

authRouter.get('/success', (req, res) => {
  console.log('successfully logged in', req.user)
  res.send(req.user)
})

authRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
  res.send('not allowed')
})

module.exports = authRouter