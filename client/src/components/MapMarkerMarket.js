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
      <Popup className="map-popup" autoPan={false}>
        <div className="mt-2 px-1 py-1 border">
          <EventInfoLabel
            market={market}
            event={market.market_events[0]}
            classes="mb-0 mt-0"
            styles={{ fontSize: 14 }}
          />
          <Button
            block
            className="btn btn-success btn-sm popup-button mt-1"
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
        {market.market_events.length > 1 && (
          <div className="mt-2 px-1 py-1 border">
            <EventInfoLabel
              market={market}
              event={market.market_events[1]}
              classes="mb-0 mt-0"
              styles={{ fontSize: 14 }}
            />
            <Button
              block
              className="btn btn-success btn-sm popup-button mt-1"
              style={{ color: "white" }}
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
          </div>
        )}
      </Popup>
    </Marker>
  )
}

export default MapMarkerMarket
