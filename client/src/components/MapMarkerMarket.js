import { Marker, Popup } from "react-leaflet"
import { Link } from "react-router-dom"
import EventInfoLabel from "./EventInfoLabel"
import Button from "react-bootstrap/Button"

const MapMarkerMarket = ({ market, icon, mapInstance }) => {
  return (
    <Marker
      position={[Number(market.location.lat), Number(market.location.lon)]}
      icon={icon}
      eventHandlers={{
        click: (e) => {
          mapInstance.flyTo(e.latlng, mapInstance.getZoom())
        },
      }}
    >
      <Popup className="market-popup" autoPan={false}>
        <div className="mx-0 my-0 px-0 py-0 border-0 popup-text">
          <EventInfoLabel
            market={market}
            event={market.market_events[0]}
            classes="mb-0 mt-0 popup-text"
          />
          <Button
            className="btn btn-success btn-sm popup-button mt-1"
            block
            style={{ color: "white" }}
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
        </div>
      </Popup>
    </Marker>
  )
}

export default MapMarkerMarket
