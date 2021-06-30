import Card from "react-bootstrap/Card"
import EventInfoLabel from "./EventInfoLabel"
import { Link } from "react-router-dom"

const EventListItemOrder = ({ event }) => {
  return (
    <Card
      className="mb-1 py-2 px-2 unstyled-link"
      as={Link}
      to={{
        pathname: `/orders/buyer/${event.event_id}`,
        state: { event: event },
      }}
    >
      <EventInfoLabel
        market={event.market}
        event={event}
        classes="mb-0"
        omitDate={true}
      />
    </Card>
  )
}

export default EventListItemOrder
