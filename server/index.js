const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)
const eventsRepository = require("./repositories/events")

//   const functioN = async () => {
//   const seller = await eventsRepository.getOrderEvent(80)
//   console.log(seller)
// }

const testMail = require('./services/templates/orderCancelTemp')
const mailSender = require('./services/mail')

/*const run = async () => {

  const template = await mailSender.initiateDeleteOrder('satojareko@gmail.com', {seller_name: "TestiPekka", email: "Testi@testi.org", phonenumber: "325532532", firstname: "Pekka", lastname: "Testipekka"},
      {name: "Pekka"}, {reko_name: "Mikkeli", start: new Date(), address: "testikatu 5, 14124"},
  [{name: "Mansikka", quantity: "3", price: "34"}, {name: "Mustikka", quantity: "4", price: "67"}])

  await mailSender.sendTestMail(template)

}

run()*/


server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})