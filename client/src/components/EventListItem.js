import Card from "react-bootstrap/Card"
import EventInfoLabel from "./EventInfoLabel"
import { Link } from "react-router-dom"

const EventListItem = ({ market, event }) => {
  return (
    <Card
      className="mb-1 py-2 px-2"
      as={Link}
      to={{
        pathname: event.id ? `/events/${event.id}` : `/events/${event.event_id}`,
        state: { event: event, market: market },
      }}
    >
      <EventInfoLabel market={market} event={event} classes="mb-0" omitDate={true} />
    </Card>
  )
}

export default EventListItem
