import Col from "react-bootstrap/Col"
import EventListItem from "./EventListItem"

const EventList = ({ events, linkTo }) => {
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
        date.getUTCFullYear() +
        (date.getUTCMonth() + 1 < 10
          ? "0" + (date.getUTCMonth() + 1)
          : date.getUTCMonth() + 1) +
        (date.getUTCDate() + 1 < 10
          ? "0" + (date.getUTCDate() + 1)
          : date.getUTCDate() + 1)

      eventsByDate[dateKey] = eventsByDate[dateKey]
        ? eventsByDate[dateKey].concat(event)
        : [event]
    })
    return eventsByDate
  }

  const eventsByDate = getEventsByDate(events)

  const getDateString = (event) => {
    const date = new Date(event.start)
    return (
      "" +
      date.getUTCDate() +
      "." +
      (date.getUTCMonth() + 1) +
      "." +
      date.getUTCFullYear()
    )
  }

  return (
    <Col xs={12} className="text-left mb-4">
      {Object.keys(eventsByDate).map((day, index) => {
        return (
          <div key={index}>
            <p className="mt-4">{getDateString(eventsByDate[day][0])}</p>
            {eventsByDate[day].map((event, index) => (
              <EventListItem
                market={event.market}
                event={event}
                linkTo={linkTo}
                key={index}
              />
            ))}
          </div>
        )
      })}
    </Col>
  )
}

export default EventList
