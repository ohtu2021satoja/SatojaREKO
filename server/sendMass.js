const eventsRepository = require("./repositories/events")

const sendMass = async () => {
  const events = eventsRepository.getEvents()
  console.log(events)
}

sendMass()