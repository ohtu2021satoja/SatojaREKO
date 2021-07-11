import Card from "react-bootstrap/Card"
import EventInfoLabel from "./EventInfoLabel"
import { Link } from "react-router-dom"

const OrdersBuyerEventListItem = ({ event }) => {
  return (
    <Card
      className="mb-2 p-2 text-decoration-none text-body"
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

export default OrdersBuyerEventListItem
