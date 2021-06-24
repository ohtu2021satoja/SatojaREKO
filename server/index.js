const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)
const eventsRepository = require("./repositories/events")

  const functioN = async () => {
  const seller = await eventsRepository.getOrderEvent(80)
  console.log(seller)
}

functioN()




// server.listen(config.PORT, () => {
//   console.log(`Server running on port ${config.PORT}`)
// })