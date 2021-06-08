import "./MapPage.css"
import { forwardRef } from "react"
import Button from "react-bootstrap/Button"
import EventPage from "./EventPage"

const MapBottomPanel = forwardRef((props, ref) => {
  const mapEvents = props.visibleEvents.map((event, index) => (
    <div key={index} style={{ marginBottom: 10 }}>
      {event.name} <br />
      {event.address} <br />
      {event.start} - {event.end}
      <Button
        className="btn btn-primary btn-sm"
        variant="success"
        onClick={() =>
          props.openPage(EventPage({ event: event, closePage: props.closePage }))
        }
      >
        Siirry tilaisuuteen
      </Button>
    </div>
  ))

  return (
    <div className="bottom-panel" ref={ref} style={{ paddingBottom: 50 }}>
      {mapEvents}
    </div>
  )
})

export default MapBottomPanel