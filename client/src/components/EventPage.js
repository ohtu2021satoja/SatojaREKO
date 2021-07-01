import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"
import EventInfoLabel from "./EventInfoLabel"
import EventPageListItem from "./EventPageListItem"
import TemplateTopNav from "./TemplateTopNav"
import { useDispatch, useSelector } from "react-redux"
import { receiveEventProducts } from "../actions/eventProducts"
import { receiveEvents } from "../actions/events"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const EventPage = (props) => {
  const { eventID } = useParams()

  const dispatch = useDispatch()
  console.log(props.location.state)

  const eventProducts = useSelector((state) => state.eventProducts[eventID])
  const events = useSelector((state) => state.events)

  const [event, setEvent] = useState(
    props.location.state ? props.location.state.event : null
  )
  const [market, setMarket] = useState(
    props.location.state ? props.location.state.market : null
  )

  useEffect(() => {
    if (!event || !market) {
      if (events.length === 0) {
        dispatch(receiveEvents())
      }
      const foundEvent = events.find((e) => Number(e.id) === Number(eventID))
      if (foundEvent) {
        setEvent(foundEvent)
        setMarket({
          id: foundEvent.market_id,
          start: foundEvent.start,
          endtime: foundEvent.endtime,
          address: foundEvent.address,
          type: foundEvent.type,
        })
      }
    }
    dispatch(receiveEventProducts(eventID))
  }, [dispatch, eventID, props.location.state, events, event, market])

  const linkTo = props.location.state
    ? props.location.state.linkTo
      ? props.location.state.linkTo
      : {
          pathname: "/map",
        }
    : {
        pathname: "/map",
      }

  return eventProducts && event ? (
    <Row className="bg-light-yellow event-row">
      <TemplateTopNav
        navHeader="Noutotilaisuus"
        navLink={linkTo}
        aria-label="Takaisin karttaan"
      />
      <Col xs={12} className="text-center mb-4">
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
