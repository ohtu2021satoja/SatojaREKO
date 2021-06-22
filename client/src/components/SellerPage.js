import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EventList from "./EventList"
import BackButtonHeader from "./BackButtonHeader"
import { useDispatch, useSelector } from "react-redux"
import { receiveSellerEvents } from "../actions/sellerEvents"
import { useEffect } from "react"

const SellerPage = (props) => {
  const seller = props.location.state.seller
  const linkTo = props.location.state.linkTo

  const dispatch = useDispatch()
  const sellerEvents = useSelector((state) => state.sellerEvents)

  useEffect(() => {
    dispatch(receiveSellerEvents(seller.id))
    //console.log("SELLER EVENTS: ", sellerEvents)
  }, [dispatch, seller])

  return (
    <Row className="mx-auto">
      <BackButtonHeader linkTo={linkTo} />
      <Col xs={12} className="d-flex justify-content-center align-items-center mb-4">
        <img src="https://via.placeholder.com/80" alt="Generic placeholder" />{" "}
      </Col>
      <Col xs={12} className="d-flex justify-content-center align-items-center mb-0">
        <div className="d-flex flex-column text-center mb-0">
          <h4>{seller.name}</h4>
          <p className="mb-0">{seller.address}</p>
          <p className="mb-0">
            {seller.county} {seller.zipcode}
          </p>
          <p className="mb-4">{seller.phonenumber}</p>
          <h4>Myyntipisteet</h4>
        </div>
      </Col>
      <Col xs={12} className="d-flex justify-content-center align-items-center mb-0">
        <EventList events={sellerEvents} />
      </Col>
    </Row>
  )
}

export default SellerPage
