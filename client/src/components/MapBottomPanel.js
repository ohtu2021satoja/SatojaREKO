import { forwardRef } from "react"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import EventInfoLabel from "./EventInfoLabel"

const MapBottomPanel = forwardRef((props, ref) => {
  const events = []

  props.visibleMarkets.forEach((market) => {
    for (let i = 0; i < 2 && i < market.market_events.length; i++) {
      const { market_events, ...rest } = market
      const res = { ...market.market_events[i], market: rest }
      events.push(res)
    }
  })

  events.sort((a, b) => new Date(a.start) - new Date(b.start))

  const printEvents = events.map((event, index) => (
    <div key={index}>
      <Card className="mb-3 light-yellow">
        <EventInfoLabel market={event.market} event={event} classes="mb-0" />
        <Button
          className="btn btn-primary btn-sm popup-button mt-1"
          variant="success"
          as={Link}
          to={{
            pathname: `/events/${event.event_id ? event.event_id : event.id}`,
            state: { market: event.market, event: event },
          }}
        >
          Siirry tilaisuuteen
        </Button>
      </Card>
    </div>
  ))

  return (
    <div className="bottom-panel" ref={ref} style={{ paddingBottom: 50 }}>
      {printEvents}
    </div>
  )
})

export default MapBottomPanel
