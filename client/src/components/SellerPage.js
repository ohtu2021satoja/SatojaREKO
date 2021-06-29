import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
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
    : sellers.find((seller) => seller.id === Number(sellerID))
  const linkTo = props.location.state.linkTo
    ? props.location.state.linkTo
    : {
        pathname: "/map",
      }

  useEffect(() => {
    dispatch(receiveSellerEvents(seller.id))
  }, [dispatch, seller])

  return (
    <Row className={sellerEvents.length > 0 ? "bg-light-blue" : "bg-light-blue vh-100"}>
      <BackButtonHeader linkTo={linkTo} />
      <Col xs={12} className="d-flex justify-content-center align-items-center mb-4">
        <img src="https://via.placeholder.com/80" alt="Generic placeholder" />{" "}
      </Col>
      <Col xs={12} className="d-flex justify-content-center align-items-center mb-0">
        <div className="d-flex flex-column text-center mb-0">
          <h4>{seller.name}</h4>
          <p className="mb-0">{seller.address}</p>
          <p className="mb-0">
            {seller.city} {seller.zipcode}
          </p>
          <p className="mb-4">{seller.phonenumber}</p>
          <h4>Myyntipisteet</h4>
        </div>
      </Col>
      <Col xs={12} className="d-flex justify-content-center align-items-center mb-5">
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
    </Row>
  )
}

export default SellerPage
