import { forwardRef } from "react"
import { Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
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
    <Col key={index}>
      <Card className="mx-0 mb-3 light-yellow">
        <EventInfoLabel market={event.market} event={event} classes="mb-0" />
        <Card.Link className="pb-4">
          <Button
            className="w-75"
            variant="success"
            as={Link}
            to={{
              pathname: `/events/${event.event_id ? event.event_id : event.id}`,
              state: { market: event.market, event: event },
            }}
          >
            Siirry tilaisuuteen
          </Button>
        </Card.Link>
      </Card>
    </Col>
  ))

  return (
    <Row className="flex-column bg-basic" ref={ref}>
      {printEvents}
    </Row>
  )
})

export default MapBottomPanel
