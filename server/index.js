const path = require('path')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const passportStrategy = require('./services/auth')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const server = express()

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

const testMail = require('./services/templates/orderCancelTemp')
const mailSender = require('./services/mail')

/*const run = async () => {

  const template = await mailSender.initiateDeleteOrder('satojareko@gmail.com', {seller_name: "TestiPekka", email: "Testi@testi.org", phonenumber: "325532532", firstname: "Pekka", lastname: "Testipekka"},
      {name: "Pekka"}, {reko_name: "Mikkeli", start: new Date(), address: "testikatu 5, 14124"},
  [{name: "Mansikka", quantity: "3", price: "34"}, {name: "Mustikka", quantity: "4", price: "67"}])

  await mailSender.sendTestMail(template)

}

run()*/

server.use(cors({credentials: true, origin: 'http://localhost:3000'}))
server.use(express.json())

server.use(express.urlencoded({ extended:true }))

server.use(session({
  secret: 'SECRET',
  resave: true,
  saveUninitialized: true
}))

server.use(passport.initialize())
server.use(passport.session())



server.use(express.static(path.join(__dirname, "build")))

// add endpoint here if refreshing problems
server.get(["/", "/profile", "/events", "/home", "/orders", "/add", "/cart", "/products"], function(req, res) {
  res.sendFile(path.join(__dirname, "/build", "index.html"), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

server.use('/api/users', usersRoute)
server.use('/api/products', productsRoute)
server.use('/api/events', eventsRoute)
server.use('/api/buyers', buyersRoute)
server.use('/api/sellers', sellersRoute)
server.use('/api/orders', ordersRoute)
server.use('/api/markets', marketsRoute)
server.use('/api/reko_areas', rekoAreasRoute)
server.use('/api/mail', mailRouter)

// Routes
server.get('/', middleware.authCheck, (req, res) => {
  console.log(req.user)
  res.send('Successfully logged in')
})
server.use('/api/auth', authRouter)

// Middlewares
server.use(middleware.unknownEndpoint)
server.use(middleware.errorHandler)

// Connect to PORT
server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
