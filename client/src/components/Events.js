import React from "react"
import Event from "./Event"

const Events = ({ events, setEventChoices, eventChoices, isChoice }) => {
  const displayEvents = events.map((event) => (
    <Event
      key={event.id}
      event={event}
      eventChoices={eventChoices}
      setEventChoices={setEventChoices}
      isChoice={isChoice}
    />
  ))
  return <div>{displayEvents}</div>
}

export default Events
