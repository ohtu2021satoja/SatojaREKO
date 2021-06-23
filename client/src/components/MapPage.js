import "./MapPage.css"
import { useRef, useEffect, useState } from "react"
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet"
import MapBottomPanel from "./MapBottomPanel"
import MapMarkerMarket from "./MapMarkerMarket"
import MapMarkerSeller from "./MapMarkerSeller"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { sellerMarkerHTML, eventMarkerHTML } from "./MapIcons"
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

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      dispatch(getMapPoints())

      return
    }

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

  const markMarkets = visibleMarkets.map((market, index) => (
    <MapMarkerMarket
      market={market}
      icon={eventMarkerHTML}
      mapInstance={mapInstance}
      key={index}
    />
  ))

  const markSellers = visibleSellers.map((seller, index) => (
    <MapMarkerSeller
      seller={seller}
      icon={sellerMarkerHTML}
      mapInstance={mapInstance}
      key={index}
    />
  ))

  return mapPoints ? (
    <>
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
      </div>
      <Row className="mt-0 mx-2">
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
    </>
  ) : (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default MapPage
