import "./MapPage.css"
import { forwardRef } from "react"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import EventInfoLabel from "./EventInfoLabel"

const MapBottomPanel = forwardRef((props, ref) => {
  const markets = props.visibleMarkets.map((market, index) => (
    <Card key={index} className="mb-3">
      <EventInfoLabel market={market} event={market.market_events[0]} classes="mb-0" />
      <Button
        className="btn btn-primary btn-sm popup-button mt-1"
        variant="success"
        as={Link}
        to={{
          pathname: `/events/${market.market_events[0].event_id}`,
          state: { market: market, event: market.market_events[0] },
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
