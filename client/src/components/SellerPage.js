import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Spinner from "react-bootstrap/Spinner"
import EventList from "./EventList"
import BackButtonHeader from "./BackButtonHeader"
import { useDispatch, useSelector } from "react-redux"
import { receiveSellerEvents } from "../actions/sellerEvents"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSeller } from "../services/sellers"

const SellerPage = (props) => {
  const { sellerID } = useParams()

  const dispatch = useDispatch()
  const sellerEvents = useSelector((state) => state.sellerEvents[sellerID])

  const [seller, setSeller] = useState(
    props.location.state ? props.location.state.seller : null
  )

  const [events, setEvents] = useState(sellerEvents ? sellerEvents : [])

  useEffect(() => {
    if (!seller) {
      const fetchSeller = async () => {
        const res = await getSeller(sellerID)
        console.log(res)
        setSeller(res)
        setEvents(res.events)
      }
      fetchSeller()
    }
    dispatch(receiveSellerEvents(sellerID))
  }, [dispatch, sellerID, seller])

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
    <Row className="bg-light-blue h-100">
      <BackButtonHeader linkTo={linkTo} />
      <Col xs={12} className="d-flex justify-content-center align-items-center mb-4">
        <Image
          src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_200/${seller.image_url}`}
          alt="Generic placeholder"
          fluid
        />
      </Col>
      <Col xs={12} className="d-flex justify-content-center align-items-center mb-0">
        <div className="d-flex flex-column text-center mb-0">
          <h4>{seller.name ? seller.name : seller.firstname + " " + seller.lastname}</h4>
          <p className="mb-0">{seller.address}</p>
          <p className="mb-0">
            {seller.city} {seller.zipcode}
          </p>
          {seller.phonenumber && <p>{seller.phonenumber}</p>}
          {seller.business_id && <p>Y-tunnus: {seller.business_id}</p>}
          {seller.homepage && (
            <a href={seller.homepage} target="_blank" rel="noreferrer" className="mb-4">
              {seller.homepage}
            </a>
          )}
          {events.length > 0 && <h4>Myyntipisteet</h4>}
        </div>
      </Col>
      {(events.length > 0 || sellerEvents) && (
        <Col xs={12} className="d-flex justify-content-center align-items-center mb-3">
          <EventList
            events={events.length > 0 ? events : sellerEvents && sellerEvents}
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
        <Col xs={12} className="mb-5 mx-3">
          <h4>Kuka olemme?</h4>
          <div>{seller.description}</div>
        </Col>
      )}
    </Row>
  ) : (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default SellerPage
