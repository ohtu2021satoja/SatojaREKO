const passport = require("passport")
const FacebookStrategy = require("passport-facebook")
const config = require("../utils/config")
const usersService = require("../services/users")

const usersRepository = require("../repositories/users")
const buyersRepository = require("../repositories/buyers")
const sellersRepository = require("../repositories/sellers")

const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  const userInDB = await usersRepository.getUserById(user.id)
  if (userInDB) {
    done(null, userInDB)
  } else {
    done(null, user)
  }
})

const authenticateUser = async (email, password, done) => {
  const user = await usersRepository.getUserByEmail(email)
  if (!user) {
    return done(null, false, { message: "No user with that email" })
  }
  try {
    const correct = await bcrypt.compare(password, user.password)

    if (correct) {
      return done(null, user)
    } else {
      return done(null, false, { message: "Incorrect password" })
    }
  } catch (error) {
    return done(null, false, { message: "Email doesn't have password" })
  }
}

passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser))

passport.use(
  new FacebookStrategy(
    {
      clientID: config.FB_CLIENT_ID,
      clientSecret: config.FB_CLIENT_SECRET,
      callbackURL: `https://${config.SERVER_HOSTNAME}/api/auth/facebook/callback`,
      profileFields: ["id", "name", "picture.type(large)", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, first_name, last_name, email } = profile._json
      // console.log(profile)

      let currentUser
      if (email) {
        currentUser = await usersRepository.getUserByEmailOrId(id, email)
      } else {
        currentUser = await usersRepository.getUserById(id)
      }
      if (currentUser) {
        done(null, currentUser)
      } else {
        const picture = profile.photos
          ? profile.photos[0].value
          : "/img/faces/unknown-user-pic.jpg"

        const userData = {
          facebook_id: id,
          firstname: first_name,
          lastname: last_name,
          email: email,
        }

        // await usersService.createUser(userData, usersRepository, sellersRepository, buyersRepository)

        return done(null, userData)
      }
    }
  )
)
