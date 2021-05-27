const path = require("path")
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors');
const server = express()

const usersRoute = require('./controllers/users')
const productsRoute = require('./controllers/products')

server.use(cors)
server.use(express.json())
server.use(express.urlencoded({ extended:true }));


server.use(express.static(path.join(__dirname, "build")))
server.use(express.json())

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

server.use(middleware.unknownEndpoint)
server.use(middleware.errorHandler)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
