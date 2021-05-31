import React from "react"
import Form from "react-bootstrap/Form"
import { addID, deleteID } from "../reducers/eventChoicesReducer"
import { useSelector, useDispatch } from "react-redux"

const Event = ({ event, isChoice }) => {
  const dispatch = useDispatch()
  const eventChoices = useSelector((state) => state.eventChoices)
  if (eventChoices.includes(event.id)) {
    console.log("checked")
  }
  const addEvent = (id) => {
    if (eventChoices.includes(id)) {
      dispatch(deleteID(id))
    } else {
      dispatch(addID(id))
    }
  }
  const startTime = new Date(event.start)
  const startHour = startTime.getHours()
  const startMinute = startTime.getMinutes()
  const endTime = new Date(event.endtime)
  const endHour = endTime.getHours()
  const endMinute = endTime.getMinutes()
  const Month = startTime.getMonth()
  const EventDate = startTime.getDate()
  return (
    <div>
      <p>
        {EventDate}.{Month}
      </p>
      <p>{event.name} (REKO)</p>
      <p>{event.address}</p>
      <p>
        {startHour}:{startMinute}-{endHour}:{endMinute}
      </p>
      {isChoice ? (
        <Form.Check
          type="switch"
          id="event-switch"
          label="label"
          onChange={() => addEvent(event.id)}
          checked={eventChoices.includes(event.id)}
        />
      ) : null}
      {eventChoices}
    </div>
  )
}

export default Event
