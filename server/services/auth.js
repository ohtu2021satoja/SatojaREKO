const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const config = require('../utils/config')
const usersService = require('../services/users')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new FacebookStrategy({
    clientID: config.FB_CLIENT_ID,
    clientSecret: config.FB_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'name', 'picture.type(large)', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    // console.log(profile)
    const currentUser = await usersService.getUser(profile.id)
    // const currentUser = false
    if (currentUser) {
      done(null, currentUser)
    } else {
      const { id, first_name, last_name, email } = profile._json
      const picture = profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg'

      const userData = {
        facebookId: id,
        firstName: first_name,
        lastName: last_name,
        email: email,
        imageURL: picture
      }
      
      usersService.createUser(userData)
    }
    // console.log('currentUser', currentUser)
    // return done(null, profile)
}))