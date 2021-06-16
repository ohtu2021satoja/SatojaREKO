import "./MapPage.css"
import { useRef, useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet"
import MapBottomPanel from "./MapBottomPanel"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import EventPage from "./EventPage"
import EventInfoLabel from "./EventInfoLabel"
import SellerPage from "./SellerPage"
import ProductPage from "./ProductPage"
import { sellerMarkerHTML, eventMarkerHTML } from "./MapIcons"

const events = [
  {
    id: 1,
    market_id: 1,
    start: "2021-05-26T16:30:00.683Z",
    endtime: "2021-05-26T17:00:00.683Z",
    area: "Etelä-Savo",
    address: "Brahentie 4",
    type: "reko_market",
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
    location: [61.512887475629874, 27.243930955869555],
  },
  {
    id: 2,
    market_id: 2,
    start: "2021-05-26T16:00:47.683Z",
    endtime: "2021-05-26T16:30:47.683Z",
    area: "Etelä-Savo",
    address: "Maaherrankatu 67",
    type: "reko_market",
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
    location: [61.695615176857764, 27.27694062704281],
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
    location: [61.65292639523773, 27.230478898204453],
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
    location: [61.56675718298595, 27.192670255872347],
    phonenumber: "050 123 4567",
  },
]

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
  const [visibleMarkets, setvisibleMarkets] = useState([])
  const [totalVisible, setTotalVisible] = useState(0)
  const [mapCenter, setMapCenter] = useState([61.59229896416896, 27.256461799773678])
  const [mapBounds, setMapBounds] = useState(null)
  const [mapInstance, setMapInstance] = useState(null)
  const [openedPage, setOpenedPage] = useState(null)

  const firstRender = useRef(true)
  const bottomPanelRef = useRef(null)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false

      return
    }

    const updateMapStatus = () => {
      const visibleMarkets = events.filter((event) => mapBounds.contains(event.location))
      const visibleSellers = sellers.filter((seller) =>
        mapBounds.contains(seller.location)
      )
      setTotalVisible(visibleMarkets.length + visibleSellers.length)
      setvisibleMarkets(visibleMarkets)
    }

    updateMapStatus()
  }, [mapBounds])

  const handleBoundsChange = (value) => {
    setMapBounds(value)
  }

  const handleCenterChange = (value) => {
    setMapCenter(value)
  }

  const handleClosePage = () => {
    setOpenedPage(null)
  }

  const handleOpenPage = (page) => {
    setOpenedPage(page)
  }

  const getMapInstance = (map) => {
    setMapInstance(map)
  }

  const handleOpenProduct = (product, event, addToCart, removeFromCart) => {
    setOpenedPage(
      ProductPage({
        product: product,
        event: event,
        returnToEvent: handleCloseProduct,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
      })
    )
  }

  const handleCloseProduct = (event) => {
    setOpenedPage(
      EventPage({
        event: event,
        closePage: handleClosePage,
        openProductPage: handleOpenProduct,
        closeProductPage: handleClosePage,
      })
    )
  }

  const scrollIntoPanel = () => {
    bottomPanelRef.current.scrollIntoView({
      behavior: "smooth",
    })
  }

  const markEvents = events.map((event, index) => (
    <Marker
      position={event.location}
      key={index}
      icon={eventMarkerHTML}
      eventHandlers={{
        click: (e) => {
          mapInstance.flyTo(e.latlng, mapInstance.getZoom())
        },
      }}
    >
      <Popup className="map-popup" autoPan={false}>
        <EventInfoLabel event={event} classes="mb-0 mt-0" styles={{ fontSize: 14 }} />
        <Button
          className="btn btn-primary btn-sm popup-button mt-1"
          variant="success"
          onClick={() =>
            setOpenedPage(
              EventPage({
                event: event,
                closePage: handleClosePage,
                openProductPage: handleOpenProduct,
                closeProductPage: handleClosePage,
              })
            )
          }
        >
          Siirry tilaisuuteen
        </Button>
      </Popup>
    </Marker>
  ))

  const markSellers = sellers.map((seller, index) => (
    <Marker
      position={seller.location}
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
          className="btn btn-primary btn-sm"
          variant="success"
          onClick={() =>
            setOpenedPage(SellerPage({ seller: seller, closePage: handleClosePage }))
          }
        >
          Tuottajan sivulle
        </Button>
      </Popup>
    </Marker>
  ))

  return openedPage ? (
    openedPage
  ) : events ? (
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
        {markEvents}
        {markSellers}
      </MapContainer>
      <Row className="mt-1 mx-2">
        <Col xs={12} className="mb-4 text-center">
          <Button className="btn btn-primary btn-sm" onClick={scrollIntoPanel}>
            Näytä lista
          </Button>
          <p>Kartan alueelta löytyi {totalVisible} noutopistettä</p>
          <MapBottomPanel
            ref={bottomPanelRef}
            visibleMarkets={visibleMarkets}
            openPage={handleOpenPage}
            closePage={handleClosePage}
          />
        </Col>
      </Row>
    </div>
  ) : (
    <p>Loading</p>
  )
}

export default MapPage
