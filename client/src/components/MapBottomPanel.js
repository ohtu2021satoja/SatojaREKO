import { forwardRef } from "react"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import EventInfoLabel from "./EventInfoLabel"

const MapBottomPanel = forwardRef((props, ref) => {
  const markets = props.visibleMarkets.map((market, index) => (
    <div key={index}>
      <Card className="mb-3 yellow">
        <EventInfoLabel market={market} event={market.market_events[0]} classes="mb-0" />
        <Button
          className="btn btn-primary btn-sm popup-button mt-1"
          variant="success"
          as={Link}
          to={{
            pathname: `/events/${
              market.market_events[0].event_id
                ? market.market_events[0].event_id
                : market.market_events[0].id
            }`,
            state: { market: market, event: market.market_events[0] },
          }}
        >
          Siirry tilaisuuteen
        </Button>
      </Card>
      {market.market_events.length > 1 && (
        <Card className="mb-3 yellow">
          <EventInfoLabel
            market={market}
            event={market.market_events[1]}
            classes="mb-0"
          />
          <Button
            className="btn btn-primary btn-sm popup-button mt-1"
            variant="success"
            as={Link}
            to={{
              pathname: `/events/${
                market.market_events[1].event_id
                  ? market.market_events[1].event_id
                  : market.market_events[1].id
              }`,
              state: { market: market, event: market.market_events[1] },
            }}
          >
            Siirry tilaisuuteen
          </Button>
        </Card>
      )}
    </div>
  ))

  return (
    <div className="bottom-panel" ref={ref} style={{ paddingBottom: 50 }}>
      {markets}
    </div>
  )
})

export default MapBottomPanel
