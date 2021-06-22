import "./MapPage.css"
import { useRef, useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import MapBottomPanel from "./MapBottomPanel"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import EventInfoLabel from "./EventInfoLabel"
import { sellerMarkerHTML, eventMarkerHTML } from "./MapIcons"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getMapPoints } from "../actions/map"

const MapInstance = (props) => {
  const map = useMapEvents({
    load: () => {
      props.setMapBounds(map.getBounds())
      props.setMapCenter(map.getCenter())
    },
    zoomend: () => {
      props.setMapBounds(map.getBounds())
      props.setMapCenter(map.getCenter())
    },
    moveend: () => {
      props.setMapBounds(map.getBounds())
      props.setMapCenter(map.getCenter())
    },
  })

  useEffect(() => {
    props.setMapInstance(map)
  }, [props, map])

  return null
}

const MapPage = () => {
  const [visibleMarkets, setVisibleMarkets] = useState([])
  const [visibleSellers, setVisibleSellers] = useState([])
  const [totalVisible, setTotalVisible] = useState(0)
  const [mapCenter, setMapCenter] = useState([61.59229896416896, 27.256461799773678])
  const [mapBounds, setMapBounds] = useState(null)
  const [mapInstance, setMapInstance] = useState(null)

  const firstRender = useRef(true)
  const bottomPanelRef = useRef(null)

  const dispatch = useDispatch()
  const mapPoints = useSelector((state) => state.mapPoints)

  // map endpoint https://satoja-reko.herokuapp.com/api/markets/map

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      dispatch(getMapPoints())

      return
    }

    //console.log("mapData in MapPage: ", mapPoints)

    if (mapPoints.Markets) {
      const updateMapStatus = () => {
        const visibleMarkets = mapPoints.Markets.filter((market) => {
          if (!market.location || !market.location.lat || !market.location.lon)
            return null
          const location = [Number(market.location.lat), Number(market.location.lon)]
          return mapBounds.contains(location)
        })

        const visibleSellers = mapPoints.Sellers.filter((seller) => {
          if (!seller.location || !seller.location.lat || !seller.location.lon)
            return null
          const location = [Number(seller.location.lat), Number(seller.location.lon)]
          return mapBounds.contains(location)
        })
        setTotalVisible(visibleMarkets.length + visibleSellers.length)
        setVisibleMarkets(visibleMarkets)
        setVisibleSellers(visibleSellers)
      }

      updateMapStatus()
    }
  }, [mapBounds, mapPoints, dispatch])

  const handleBoundsChange = (value) => {
    setMapBounds(value)
  }

  const handleCenterChange = (value) => {
    setMapCenter(value)
  }

  const getMapInstance = (map) => {
    setMapInstance(map)
  }

  const scrollIntoPanel = () => {
    bottomPanelRef.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  const markMarkets = visibleMarkets.map((market, index) => {
    return (
      <Marker
        position={[Number(market.location.lat), Number(market.location.lon)]}
        key={index}
        icon={eventMarkerHTML}
        eventHandlers={{
          click: (e) => {
            mapInstance.flyTo(e.latlng, mapInstance.getZoom())
          },
        }}
      >
        <Popup className="map-popup" autoPan={false}>
          <EventInfoLabel
            market={market}
            event={market.market_events[0]}
            classes="mb-0 mt-0"
            styles={{ fontSize: 14 }}
          />
          <Button
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
        </Popup>
      </Marker>
    )
  })

  const markSellers = visibleSellers.map((seller, index) => (
    <Marker
      position={[Number(seller.location.lat), Number(seller.location.lon)]}
      key={index}
      icon={sellerMarkerHTML}
      eventHandlers={{
        click: (e) => {
          mapInstance.flyTo(e.latlng, mapInstance.getZoom())
        },
      }}
    >
      <Popup autoPan={false}>
        {seller.name} <br />
        {seller.address} <br />
        <Button
          className="btn btn-success btn-sm popup-button"
          style={{ color: "white" }}
          variant="success"
          as={Link}
          to={{
            pathname: `/sellers/${seller.id}`,
            state: {
              seller: seller,
              linkTo: {
                pathname: "/map",
              },
            },
          }}
        >
          Tuottajan sivulle
        </Button>
      </Popup>
    </Marker>
  ))

  return mapPoints ? (
    <div className="map-container">
      <MapContainer
        center={mapCenter}
        scrollWheelZoom={true}
        zoom={10}
        whenCreated={(map) => {
          setMapBounds(map.getBounds())
          setMapCenter(map.getCenter())
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapInstance
          setMapBounds={handleBoundsChange}
          setMapCenter={handleCenterChange}
          setMapInstance={getMapInstance}
        />
        {markMarkets}
        {markSellers}
      </MapContainer>
      <Row className="mt-1 mx-2">
        <Col xs={12} className="mb-4 text-center">
          <Button
            className="btn btn-sm"
            variant="outline-success"
            onClick={scrollIntoPanel}
          >
            Näytä lista
          </Button>
          <p>Kartan alueelta löytyi {totalVisible} noutopistettä</p>
          <MapBottomPanel ref={bottomPanelRef} visibleMarkets={visibleMarkets} />
        </Col>
      </Row>
    </div>
  ) : (
    <p>Loading</p>
  )
}

export default MapPage
