import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Spinner from "react-bootstrap/Spinner"
import { useDispatch, useSelector } from "react-redux"
import { receiveBuyerOrders } from "../actions/buyerOrders"
import { useEffect } from "react"
import OrdersBuyerEventListItem from "./OrdersBuyerEventListItem"

const OrdersBuyer = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.authedUser)
  const events = useSelector((state) => state.buyerOrders)

  useEffect(() => {
    dispatch(receiveBuyerOrders(user.id))
  }, [dispatch, user])

  const sortByTime = (eventsArray) => {
    return eventsArray.sort((a, b) => {
      return new Date(a.event_start) - new Date(b.event_start)
    })
  }

  const getEventsByDate = (eventsArray) => {
    const sortedArray = sortByTime(eventsArray)
    const eventsByDate = {}
    sortedArray.forEach((event) => {
      const date = new Date(event.event_start)

      const dateKey =
        "" +
        date.getUTCFullYear() +
        (date.getUTCMonth() + 1 < 10
          ? "0" + (date.getUTCMonth() + 1)
          : date.getUTCMonth() + 1) +
        (date.getUTCDate() + 1 < 10
          ? "0" + (date.getUTCDate() + 1)
          : date.getUTCDate() + 1)

      eventsByDate[dateKey] = eventsByDate[dateKey]
        ? eventsByDate[dateKey].concat(event)
        : [event]
    })
    return eventsByDate
  }

  const eventsByDate = getEventsByDate(events)

  const getDateString = (event) => {
    const date = new Date(event.event_start)
    return (
      "" +
      date.getUTCDate() +
      "." +
      (date.getUTCMonth() + 1) +
      "." +
      date.getUTCFullYear()
    )
  }

  return eventsByDate ? (
    <Row className="h-100 mb-5 bg-light-green">
      <Col xs={12} className="pt-5 text-center">
        <h2>Noudot</h2>
        <h3>Tulevat noudot</h3>
      </Col>
      <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
        {Object.keys(eventsByDate).map((day, index) => {
          return (
            <Row key={index} className="mb-2 px-2 flex-column">
              <Col className="pl-0">
                <p className="mb-1">{getDateString(eventsByDate[day][0])}</p>
              </Col>
              {eventsByDate[day].map((event, index) => (
                <OrdersBuyerEventListItem
                  event={event}
                  linkTo={{
                    pathname: `/orders/buyer/${event.event_id}`,
                    state: { event: event },
                  }}
                  key={index}
                />
              ))}
            </Row>
          )
        })}
      </Col>
    </Row>
  ) : (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default OrdersBuyer
