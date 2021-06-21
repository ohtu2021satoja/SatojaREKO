import Card from "react-bootstrap/Card"
import EventInfoLabel from "./EventInfoLabel"
import { Link } from "react-router-dom"

const EventListItem = ({ event }) => {
  return (
    <Card
      className="mb-1 py-2 px-2"
      as={Link}
      to={{
        pathname: `/events/${event.id}`,
        state: { event: event },
      }}
    >
      <EventInfoLabel event={event} classes="mb-0" omitDate={true} />
    </Card>
  )
}

export default EventListItem
