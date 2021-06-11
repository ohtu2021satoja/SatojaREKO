const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const config = require('../utils/config')
const usersRepository = require('../repositories/users')
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

passport.serializeUser((user, done) => {
    console.log('serialize =====> ', user)
    console.log('serialize id =====> ', user.id)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await usersRepository.getUserById(id)
    console.log('deserialize =====> ', user)
    done(null, user)
})

const authenticateUser = async (email, password, done) => {
  console.log("yeet")
  const user = await usersRepository.getUserByEmail(email)
  if (!user){
    return done(null, false, { message: "No user with that email"})
  }
  console.log(user.password)
  console.log(password)
  const correct = password===user.password
  if(correct){
    console.log("success")
    return done(null, user)
  } else {
    return done(null, false, { message: "Incorrect password" })
  }

}

passport.use(new LocalStrategy({ usernameField: "email"}, authenticateUser))

passport.use(new FacebookStrategy({
  clientID: config.FB_CLIENT_ID,
  clientSecret: config.FB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3003/api/auth/facebook/callback',
  profileFields: ['id', 'name', 'picture.type(large)', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  // console.log(profile)
  const currentUser = await usersRepository.getUserById(profile.id)
  // const currentUser = false
  if (currentUser) {
    done(null, currentUser)
  } else {
    const { id, first_name, last_name, email } = profile._json
    const picture = profile.photos ? profile.photos[0].value : '/img/faces/unknown-user-pic.jpg'

    const userData = {
      facebook_id: id,
      firstname: first_name,
      lastname: last_name,
      email: email
    }

    console.log("userData",userData)
    
    await usersRepository.createUser(userData)
    
    return done(null, profile)
  }
}))
