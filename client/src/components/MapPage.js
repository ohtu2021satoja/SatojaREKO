import "./MapPage.css"
import { useRef, useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet"
import MapBottomPanel from "./MapBottomPanel"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const events = [
  {
    id: 1,
    market_id: 1,
    start: "2021-05-26T16:11:47.683Z",
    endtime: "2021-05-26T16:11:47.683Z",
    area: "Etelä-Savo",
    address: "Brahentie 4",
    type: "reko_market",
    location: "fsdafda",
    areas_id: 1,
    name: "Ristiina",
    seller_id: 1,
    reko_area_id: 1,
    homepage: "www.john.fi",
    zipcode: "52300",
    county: "Ristiina",
    salesreport_check: false,
    description: "I am john",
    image_url: "profile-blank_or75kg",
    coordinates: [61.512887475629874, 27.243930955869555],
  },
  {
    id: 2,
    market_id: 2,
    start: "2021-05-26T16:11:47.683Z",
    endtime: "2021-05-26T16:11:47.683Z",
    area: "Etelä-Savo",
    address: "Maaherrankatu 67",
    type: "reko_market",
    location: "fsdafda",
    areas_id: 1,
    name: "Mikkeli",
    seller_id: 1,
    reko_area_id: 1,
    homepage: "www.john.fi",
    zipcode: "50500",
    county: "Mikkeli",
    salesreport_check: false,
    description: "I am john",
    image_url: "profile-blank_or75kg",
    coordinates: [61.695615176857764, 27.27694062704281],
  },
]

const sellers = [
  {
    id: 1,
    name: "Terpan tila",
    homepage: "www.terpantila.fi",
    address: "Tapsantaival 10",
    zipcode: "50500 ",
    county: "Mikkeli",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    location: "",
    coordinates: [61.65292639523773, 27.230478898204453],
    phonenumber: "050 123 4567",
  },
  {
    id: 2,
    name: "John's farm",
    homepage: "www.john.fi",
    address: "Valkolankuja 5",
    zipcode: "52320",
    county: "Ristiina",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    location: "",
    coordinates: [61.56675718298595, 27.192670255872347],
    phonenumber: "050 123 4567",
  },
]

const MapInstance = ({ setMapBounds }) => {
  const map = useMap()

  const mapEvents = useMapEvents({
    load: () => {
      setMapBounds(map.getBounds())
    },
    zoomend: () => {
      setMapBounds(map.getBounds())
    },
    moveend: () => {
      setMapBounds(map.getBounds())
    },
  })

  return null
}

const MapPage = () => {
  const [visibleEvents, setVisibleEvents] = useState([])
  const [visibleSellers, setVisibleSellers] = useState([])
  const [totalVisible, setTotalVisible] = useState(0)
  const [mapBounds, setMapBounds] = useState(null)

  const firstRender = useRef(true)
  const bottomPanelRef = useRef(null)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    const updateMapStatus = () => {
      const visibleEvents = events.filter((event) =>
        mapBounds.contains(event.coordinates)
      )
      const visibleSellers = sellers.filter((seller) =>
        mapBounds.contains(seller.coordinates)
      )
      setTotalVisible(visibleEvents.length + visibleSellers.length)
      setVisibleEvents(visibleEvents)
      setVisibleSellers(visibleSellers)
    }

    updateMapStatus()
  }, [mapBounds])

  const handleBoundsChange = (value) => {
    setMapBounds(value)
  }

  const scrollIntoPanel = () => {
    bottomPanelRef.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  const markEvents = events.map((event, index) => (
    <Marker position={event.coordinates} key={index}>
      <Popup>
        Noutotilaisuus <br /> {event.address}
      </Popup>
    </Marker>
  ))

  const markSellers = sellers.map((seller, index) => (
    <Marker position={seller.coordinates} key={index}>
      <Popup>
        {seller.name} <br /> {seller.address}
      </Popup>
    </Marker>
  ))

  return (
    <div className="map-container">
      <MapContainer
        center={[61.57229896416896, 27.256461799773678]}
        scrollWheelZoom={true}
        zoom={10}
        whenCreated={(map) => {
          setMapBounds(map.getBounds())
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapInstance setMapBounds={handleBoundsChange} />
        {markEvents}
        {markSellers}
      </MapContainer>
      <Row className="mt-1 mx-2">
        <Col xs={12} className="mb-4 text-center">
          <Button className="btn btn-primary btn-sm" onClick={scrollIntoPanel}>
            Näytä lista
          </Button>
          <p>Kartan alueelta löytyi {totalVisible} noutopistettä</p>
          <MapBottomPanel ref={bottomPanelRef} visibleEvents={visibleEvents} />
        </Col>
      </Row>
    </div>
  )
}

export default MapPage
