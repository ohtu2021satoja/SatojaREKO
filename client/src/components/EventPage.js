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
  //console.log("eventID: " + eventID)

  const event = props.location.state.event
  const market = props.location.state.market

  const dispatch = useDispatch()
  const eventProducts = useSelector((state) => state.eventProducts[eventID])

  useEffect(() => {
    dispatch(receiveEventProducts(eventID))
  }, [dispatch, eventID])

  return eventProducts ? (
    <Row>
      <BackButtonHeader
        linkTo={{
          pathname: "/map",
        }}
      />
      <Col xs={12} className="text-center mb-4">
        <h2 className="mb-4">Noutotilaisuus</h2>
        <EventInfoLabel
          market={market}
          event={event}
          classes="mb-0"
          styles={{ fontSize: 16 }}
        />
      </Col>
      <Col xs={12} className="mx-auto">
        {eventProducts.map((product, index) => (
          <EventPageListItem
            product={product}
            event={event}
            market={market}
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
