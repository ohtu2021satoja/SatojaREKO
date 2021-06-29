import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"
import EventInfoLabel from "./EventInfoLabel"
import EventPageListItem from "./EventPageListItem"
import BackButtonHeader from "./BackButtonHeader"
import { useDispatch, useSelector } from "react-redux"
import { receiveEventProducts } from "../actions/eventProducts"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const EventPage = (props) => {
  const { eventID } = useParams()

  const event = props.location.state.event
  const market = props.location.state.market
  const linkTo = props.location.state.linkTo
    ? props.location.state.linkTo
    : {
        pathname: "/map",
      }

  const dispatch = useDispatch()
  const eventProducts = useSelector((state) => state.eventProducts[eventID])

  useEffect(() => {
    dispatch(receiveEventProducts(eventID))
  }, [dispatch, eventID])

  return eventProducts ? (
    <Row className="bg-light-yellow event-row">
      <BackButtonHeader linkTo={linkTo} />
      <Col xs={12} className="text-center mb-4">
        <h2 className="mb-4">Noutotilaisuus</h2>
        <EventInfoLabel
          market={market}
          event={event}
          classes="mb-0"
          styles={{ fontSize: 16 }}
        />
      </Col>
      <Col xs={12} className="mb-5">
        {eventProducts.map((product, index) => (
          <EventPageListItem
            product={product}
            event={event}
            market={market}
            singleSize={product.sizes.length === 1}
            key={index}
          />
        ))}
      </Col>
    </Row>
  ) : (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default EventPage
