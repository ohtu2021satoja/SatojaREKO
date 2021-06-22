import "./MapPage.css"
import { forwardRef } from "react"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import EventInfoLabel from "./EventInfoLabel"

const MapBottomPanel = forwardRef((props, ref) => {
  const markets = props.visibleMarkets.map((event, index) => (
    <Card key={index} className="mb-3">
      <EventInfoLabel event={event} classes="mb-0" />
      <Button
        className="btn btn-primary btn-sm popup-button mt-1"
        variant="success"
        as={Link}
        to={{
          pathname: `/events/${event.id}`,
          state: { event: event },
        }}
      >
        Siirry tilaisuuteen
      </Button>
    </Card>
  ))

  return (
    <div className="bottom-panel" ref={ref} style={{ paddingBottom: 50 }}>
      {markets}
    </div>
  )
})

export default MapBottomPanel
