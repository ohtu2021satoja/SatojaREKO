import Card from "react-bootstrap/Card"
import EventInfoLabel from "./EventInfoLabel"

const EventListItem = ({ event }) => {
  return (
    <Card className="mb-1 py-2 px-2">
      <EventInfoLabel event={event} classes="mb-0" omitDate={true} />
    </Card>
  )
}

export default EventListItem
