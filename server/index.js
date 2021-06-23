const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)
const ordersRepository = require("./repositories/orders")

const functioN = async () => {
  const order = await ordersRepository.getSellersOrder(76,80)
  console.log(order)
}

functioN()

//  server.listen(config.PORT, () => {
//    console.log(`Server running on port ${config.PORT}`)
//  })