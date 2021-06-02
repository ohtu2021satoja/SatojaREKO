const passport = require('passport')
const authRouter = require('express').Router()

// auth with facebook
authRouter.get('/facebook', passport.authenticate('facebook'))

// callback route for facebook redirect
authRouter.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/fail' }), (req, res) => {
    // Successful authentication, redirect home.
    console.log('success')
    res.redirect('/success')
})

module.exports = authRouter