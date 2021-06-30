const path = require('path')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const app = express()

const usersRoute = require('./controllers/users')
const productsRoute = require('./controllers/products')
const eventsRoute = require('./controllers/events')
const buyersRoute = require('./controllers/buyers')
const sellersRoute = require('./controllers/sellers')
const ordersRoute = require('./controllers/orders')
const marketsRoute = require('./controllers/markets')
const authRouter = require('./controllers/auth')
const rekoAreasRoute = require('./controllers/reko_areas')
const mailRouter = require('./controllers/mail')


app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())

app.use(express.urlencoded({ extended:true }))

app.use(session({
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

const passportStrategy = require('./services/auth')



app.use(express.static(path.join(__dirname, "build")))

// add endpoint here if refreshing problems
app.get(["/", "/profile", "/events", "/home", "/orders", "/add", "/cart", "/products", "/admin","/orders/buyer", "/passwordreset", "/admin", "/update/:id", "/orders/seller", "/profile/seller", "profile/buyer", "/contact", "/map", "/events/:eventID", "/orders/buyer/:eventID", "/events/:eventID/products/:productID", "/sellers/:sellerID"], function(req, res) {
  res.sendFile(path.join(__dirname, "/build", "index.html"), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use('/api/users', usersRoute)
app.use('/api/products', productsRoute)
app.use('/api/events', eventsRoute)
app.use('/api/buyers', buyersRoute)
app.use('/api/sellers', sellersRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/markets', marketsRoute)
app.use('/api/reko_areas', rekoAreasRoute)
app.use('/api/mail', mailRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testRouter')
  app.use('/api/test', testingRouter)
}

// Routes
app.get('/', middleware.authCheck, (req, res) => {
  console.log(req.user)
  res.send('Successfully logged in')
})
app.use('/api/auth', authRouter)

// Middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
