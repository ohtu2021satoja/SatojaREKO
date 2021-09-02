import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EventListItem from "./EventListItem"

const EventList = ({ events, linkTo }) => {
  console.log("EVENTS IN EVENTLIST", events)

  const sortByTime = (eventsArray) => {
    return eventsArray.sort((a, b) => {
      return new Date(a.start) - new Date(b.start)
    })
  }

  const getEventsByDate = (eventsArray) => {
    const sortedArray = sortByTime(eventsArray)
    const eventsByDate = {}
    sortedArray.forEach((event) => {
      const date = new Date(event.start)
      const dateKey =
        "" +
        date.getFullYear() +
        (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) +
        (date.getDate() + 1 < 10 ? "0" + (date.getDate() + 1) : date.getDate() + 1)

      eventsByDate[dateKey] = eventsByDate[dateKey]
        ? eventsByDate[dateKey].concat(event)
        : [event]
    })
    return eventsByDate
  }

  const getDateString = (event) => {
    const date = new Date(event.start)
    return "" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
  }

  const eventsByDate = getEventsByDate(events)

  return (
    <Row>
      {Object.keys(eventsByDate).map((day, index) => {
        return (
          <Col xs={12} key={index} className="mb-4">
            <p className="mb-1">{getDateString(eventsByDate[day][0])}</p>
            {eventsByDate[day].map((event, index) => (
              <EventListItem
                market={event.market}
                event={event}
                linkTo={linkTo}
                key={index}
              />
            ))}
          </Col>
        )
      })}
    </Row>
  )
}

export default EventList
