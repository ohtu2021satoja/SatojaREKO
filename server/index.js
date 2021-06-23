const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)
const sellersRepository= require("./repositories/sellers")

// const functioN = async () => {
//   const seller = await sellersRepository.getSeller(76)
//   console.log(seller)
// }

// functioN()


const eventsRepository = require("./repositories/events")

const sendMass = async () => {
  const currentDate = new Date()
  const events = await eventsRepository.getEvents()
  const todaysEvents = events.filter((event)=> {
    return(
      // event.start.getUTCDate() === currentDate.getUTCDate() && event.start.getUTCMonth === currentDate.getUTCMonth()
      event.start.getUTCDate() == 21 && event.start.getUTCMonth() == 5
    )
  })
  const eventIDs = todaysEvents.map(event => event.id)
  const allevents = await eventsRepository.getMassEmail(eventIDs)
  console.log(allevents)
}

sendMass()

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})