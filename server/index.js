const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const server = express()
const path = require("path")

const usersRoute = require('./controllers/users')
const productsRoute = require('./controllers/products')

server.use(express.json())

server.use(express.static(path.join(__dirname, "build")))

server.use('/users', usersRoute)
server.use('/products', productsRoute)

server.use(middleware.unknownEndpoint)
server.use(middleware.errorHandler)






server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
