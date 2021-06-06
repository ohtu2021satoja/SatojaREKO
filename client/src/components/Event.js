import React from "react"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import { addID, deleteID } from "../reducers/eventChoicesReducer"
import { useSelector, useDispatch } from "react-redux"

const Event = ({ event, isChoice }) => {
  const dispatch = useDispatch()
  const eventChoices = useSelector((state) => state.eventChoices)
  const isChosen = eventChoices.includes(event.id)

  const addEvent = (id) => {
    if (isChosen) {
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
      <h4>{EventDate}.{Month}</h4>
      <Card
          as={Col}
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
          xl={{ span: 4, offset: 4 }}
          >

            <div>
              {event.name} (REKO)
            </div>
            {event.address}
            <div>
              {startHour}:{startMinute}-{endHour}:{endMinute}
            </div>
            <div>
            {isChoice ? (
              <Form.Check
              type="switch"
              id={`event-switch-${event.id}`}
              onChange={() => addEvent(event.id)}
              checked={eventChoices.includes(event.id)}
              />
              ) : null}
            </div>
          </Card>
    </div>
  )
}

export default Event