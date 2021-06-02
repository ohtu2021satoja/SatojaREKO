const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const config = require('../utils/config')

passport.use(new FacebookStrategy({
    clientID: config.FB_CLIENT_ID,
    clientSecret: config.FB_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    // return done(null, profile)
}))