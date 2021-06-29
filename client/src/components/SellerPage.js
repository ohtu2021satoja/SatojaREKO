import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Spinner from "react-bootstrap/Spinner"
import EventList from "./EventList"
import BackButtonHeader from "./BackButtonHeader"
import { useDispatch, useSelector } from "react-redux"
import { receiveSellerEvents } from "../actions/sellerEvents"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const SellerPage = (props) => {
  const { sellerID } = useParams()

  const dispatch = useDispatch()
  const sellerEvents = useSelector((state) => state.sellerEvents)
  const sellers = useSelector((state) => state.mapPoints.Sellers)

  const seller = props.location.state.seller
    ? props.location.state.seller
    : sellers.find((seller) => Number(seller.id) === Number(sellerID))
  const linkTo = props.location.state.linkTo
    ? props.location.state.linkTo
    : {
        pathname: "/map",
      }

  useEffect(() => {
    dispatch(receiveSellerEvents(seller.id))
  }, [dispatch, seller])

  return seller ? (
    <Row className={sellerEvents.length > 0 ? "bg-light-blue" : "bg-light-blue vh-100"}>
      <BackButtonHeader linkTo={linkTo} />
      <Col xs={12} className="d-flex justify-content-center align-items-center mb-4">
        <Image
          src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_80/${seller.image_url}`}
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
            <a href={seller.homepage} className="mb-4">
              {seller.homepage}
            </a>
          )}
          {sellerEvents.length > 0 && <h4>Myyntipisteet</h4>}
        </div>
      </Col>
      <Col xs={12} className="d-flex justify-content-center align-items-center mb-3">
        <EventList
          events={sellerEvents}
          linkTo={{
            pathname: `/sellers/${seller.id}`,
            state: {
              seller: seller,
            },
          }}
        />
      </Col>
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
