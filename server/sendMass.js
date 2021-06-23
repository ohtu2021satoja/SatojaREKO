 const eventsRepository = require("./repositories/events")
 const db = require("./db")

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
   process.exit()
}

sendMass()