import Card from "react-bootstrap/Card"

const OrdersSellerEvent = (props) => {
  const RenderEvents = (event, index) => {
    var dateStart = new Date(event.event_start)
    var dateEnd = new Date(event.event_endtime)
    var dateMinutesStart = dateStart.getMinutes()
    // changes 10:0 to 10:00
    if (dateStart.getMinutes() === 0) {
      dateMinutesStart = "00"
    }
    var dateMinutesEnd = dateEnd.getMinutes()
    // changes 10:0 to 10:00
    if (dateEnd.getMinutes() === 0) {
      dateMinutesEnd = "00"
    }

    return (
      <Card
        key={index}
        className="mb-1 bg-light-gray border border-1 border-secondary"
        onClick={() => {
          props.setEventId(event.event_id)
        }}
      >
        <Card.Body>
          <Card.Text className="mb-0">{event.reko_name} (REKO)</Card.Text>
          <Card.Text className="mb-0">{event.event_address}</Card.Text>
          <Card.Text className="mb-0">
            aika {dateStart.getHours()}:{dateMinutesStart}-{dateEnd.getHours()}:
            {dateMinutesEnd}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
  return <div>{props.Orderasd.map(RenderEvents)}</div>
}

export default OrdersSellerEvent
