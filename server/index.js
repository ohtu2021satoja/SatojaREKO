const path = require('path')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const passportStrategy = require('./services/auth')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const server = express()

const authRouter = require('./controllers/auth')
const usersRouter = require('./controllers/users')
const productsRouter = require('./controllers/products')
const eventsRouter = require('./controllers/events')

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended:true }))

server.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false
}))

server.use(passport.initialize())
server.use(passport.session())

server.use('/auth', authRouter)
server.use('/api/users', usersRouter)
server.use('/api/products', productsRouter)
server.use('/api/events', eventsRouter)

server.use(express.static(path.join(__dirname, '/build')))

// add endpoint here if refreshing problems
server.get(['/', '/profile', '/events', '/home', '/orders', '/add', '/cart', '/products'], function(req, res) {
    res.sendFile(path.resolve(__dirname, '/build', 'index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

server.use(middleware.unknownEndpoint)
server.use(middleware.errorHandler)

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})