import React from "react"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import { addID, deleteID } from "../reducers/eventChoicesReducer"
import { useSelector, useDispatch } from "react-redux"

const Event = ({ event, isChoice, setEventChoiceError }) => {
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
  const startHour = startTime.getUTCHours()
  const startMinute = startTime.getUTCMinutes()
  const endTime = new Date(event.endtime)
  const endHour = endTime.getUTCHours()
  const endMinute = endTime.getUTCMinutes()
  const Month = startTime.getUTCMonth() + 1
  const EventDate = startTime.getUTCDate()
  return (
    <div className="mb-2">
      <h4 className="mb-0 pt-3">
        {EventDate}.{Month}
      </h4>
      <Card
        as={Col}
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
        xl={{ span: 4, offset: 4 }}
        className="py-2"
      >
        <div>{event.name} (REKO)</div>
        {event.address}
        <div>
          {startHour}:{startMinute}-{endHour}:{endMinute}
        </div>
        <div>
          {isChoice ? (
            <Form.Check
              type="switch"
              id={`event-switch-${event.id}`}
              onChange={() => {
                addEvent(event.id)
                setEventChoiceError(false)
              }}
              checked={eventChoices.includes(event.id)}
            />
          ) : null}
        </div>
      </Card>
    </div>
  )
}

export default Event
