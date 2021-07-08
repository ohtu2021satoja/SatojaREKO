import React from "react"
import Event from "./Event"

const Events = ({
  events,
  setEventChoices,
  eventChoices,
  isChoice,
  setEventChoiceError,
}) => {
  const displayEvents = events.map((event) => (
    <Event
      key={event.id}
      event={event}
      eventChoices={eventChoices}
      setEventChoices={setEventChoices}
      isChoice={isChoice}
      setEventChoiceError={setEventChoiceError}
    />
  ))
  return <div className="pb-4">{displayEvents}</div>
}

export default Events
