import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Spinner from "react-bootstrap/Spinner"
import EventList from "./EventList"
import TemplateTopNav from "./TemplateTopNav"
import { getSellersUpcomingEventsWithProducts } from "../services/events"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSeller } from "../services/sellers"

const SellerPage = (props) => {
  const { sellerID } = useParams()

  const [seller, setSeller] = useState(
    props.location.state ? props.location.state.seller : null
  )

  const [events, setEvents] = useState(null)

  useEffect(() => {
    if (!seller) {
      const fetchSeller = async () => {
        const res = await getSeller(sellerID)
        setSeller(res)
        setEvents(res.events)
      }
      fetchSeller()
    }
    if (seller && !events) {
      const fetchEvents = async () => {
        const res = await getSellersUpcomingEventsWithProducts(sellerID)
        setEvents(res)
      }
      fetchEvents()
    }
  }, [sellerID, seller, events])

  const linkTo = props.location.state
    ? props.location.state.linkTo
      ? props.location.state.linkTo
      : {
          pathname: "/map",
        }
    : {
        pathname: "/map",
      }

  return seller ? (
    <Row className="h-100 bg-light-blue">
      <TemplateTopNav
        navLink={linkTo}
        altText="Palaa noutotilaisuuksiin"
        navHeader={seller.name ? seller.name : seller.firstname + " " + seller.lastname}
      />
      <Col
        xs={12}
        md={{ span: 10, offset: 1 }}
        lg={{ span: 8, offset: 2 }}
        className="pt-4"
      >
        <Row className="align-items-center">
          <Col xs={{ span: 6, offset: 3 }} className="mb-2">
            <Image
              src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_600/${seller.image_url}`}
              alt="Generic placeholder"
              fluid
            />
          </Col>
          <Col xs={12} className="mb-4 text-center">
            <h4 className="mb-0">{seller.address}</h4>
            <p className="mb-0">
              {seller.city} {seller.zipcode}
            </p>
            {seller.phonenumber && <p>{seller.phonenumber}</p>}
            {seller.business_id && <p>Y-tunnus: {seller.business_id}</p>}
            {seller.homepage && (
              <a href={seller.homepage} target="_blank" rel="noreferrer">
                {seller.homepage}
              </a>
            )}
          </Col>
        </Row>
      </Col>
      <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
        <Row>
          <Col className="text-center">
            {events && events.length > 0 && <h3 className="mb-4">Myyntipisteet</h3>}
          </Col>
          {events && events.length > 0 && (
            <Col xs={12}>
              <EventList
                events={events}
                linkTo={{
                  pathname: `/sellers/${seller.id}`,
                  state: {
                    seller: seller,
                  },
                }}
              />
            </Col>
          )}
          {seller.description && (
            <Col xs={12} className="mb-5 pt-4">
              <h4>Kuka olemme?</h4>
              <div>{seller.description}</div>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  ) : (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default SellerPage
