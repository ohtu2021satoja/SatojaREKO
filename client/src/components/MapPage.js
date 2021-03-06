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
    },
    zoomend: () => {
      props.setMapBounds(map.getBounds())
    },
    moveend: () => {
      props.setMapBounds(map.getBounds())
    },
    locationfound: (e) => {
      map.setView(e.latlng, 9)
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
  const [mapBounds, setMapBounds] = useState(null)
  const [mapInstance, setMapInstance] = useState(null)

  const defaultLocation = [61.59229896416896, 27.256461799773678]

  const firstRender = useRef(true)
  const bottomPanelRef = useRef(null)

  const dispatch = useDispatch()
  const mapPoints = useSelector((state) => state.mapPoints)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      window.scrollTo(0, 0)
      dispatch(getMapPoints())
      return
    }

    if (Object.keys(mapPoints).length > 0 && mapBounds) {
      const updateMapStatus = () => {
        const visibleMarkets = mapPoints.Markets
          ? mapPoints.Markets.filter((market) => {
              if (!market.location || !market.location.lat || !market.location.lon)
                return null
              const location = [Number(market.location.lat), Number(market.location.lon)]
              return mapBounds.contains(location)
            })
          : []
        const visibleSellers = mapPoints.Sellers
          ? mapPoints.Sellers.filter((seller) => {
              if (!seller.location || !seller.location.lat || !seller.location.lon)
                return null
              const location = [Number(seller.location.lat), Number(seller.location.lon)]
              return mapBounds.contains(location)
            })
          : []

        setTotalVisible(visibleMarkets.length)
        setVisibleMarkets(visibleMarkets)
        setVisibleSellers(visibleSellers)
      }

      updateMapStatus()
    }
  }, [mapBounds, mapPoints, dispatch])

  const handleBoundsChange = (value) => {
    setMapBounds(value)
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
    <Row>
      <Col
        xs={12}
        md={{ span: 10, offset: 1 }}
        lg={{ span: 8, offset: 2 }}
        className="px-0"
      >
        <div className="map-container">
          <MapContainer
            scrollWheelZoom={true}
            zoom={9}
            center={defaultLocation}
            whenCreated={(map) => {
              try {
                //map.locate({ setView: true, enableHighAccuracy: true, maxZoom: 12 })
                map.locate()
                setMapBounds(map.getBounds())
                //map.setZoom(9)
              } catch (e) {
                console.log(e)
              }
            }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapInstance
              setMapBounds={handleBoundsChange}
              setMapInstance={getMapInstance}
            />
            {markMarkets}
            {markSellers}
          </MapContainer>
        </div>
      </Col>
      <Col
        xs={12}
        md={{ span: 10, offset: 1 }}
        lg={{ span: 8, offset: 2 }}
        className="px-0"
        style={{ marginTop: -40, zIndex: 1000 }}
      >
        <Row className="m-0 px-0">
          <Col xs={12} className="mb-0 px-0 text-center">
            <Button variant="dark" className="btn-rounded-top" onClick={scrollIntoPanel}>
              N??yt?? lista
            </Button>
            <p className="mb-0 py-2 bg-dark text-white" style={{ fontSize: "0.75rem" }}>
              Kartan alueelta l??ytyi{" "}
              {totalVisible === 1
                ? totalVisible + " noutopiste"
                : totalVisible + " noutopistett??"}
            </p>
          </Col>
          <Col xs={12} className="mb-4 px-0 text-center">
            <MapBottomPanel ref={bottomPanelRef} visibleMarkets={visibleMarkets} />
          </Col>
        </Row>
      </Col>
    </Row>
  ) : (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default MapPage
