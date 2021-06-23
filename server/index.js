const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)

// const functioN = async () => {
//   const seller = await sellersRepository.getSeller(76)
//   console.log(seller)
// }

// functioN()




server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})