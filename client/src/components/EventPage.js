import Button from "react-bootstrap/Button"

const EventPage = ({ event, closePage }) => (
  <div>
    <p>Noutotilaisuus paikassa {event.address}</p>
    <Button className="btn btn-primary btn-sm" onClick={closePage}>
      Takaisin karttaan
    </Button>
  </div>
)

export default EventPage
