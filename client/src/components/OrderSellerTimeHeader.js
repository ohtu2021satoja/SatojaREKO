import Col from "react-bootstrap/esm/Col"

const OrderSellerTimeHeader = (props) => {
  return (
    <Col xs={12} className="py-4 text-center">
      <h4 className="mb-4">{props.Order.reko_name}</h4>
      <p xs={12} className="mb-0">
        {props.datepaiva} {props.thisDate}.{props.month}.
      </p>
      <p xs={12} className="mb-0">
        {props.dateHourStart}:{props.dateMinutesStart}-{props.dateHourEnd}:
        {props.dateMinutesEnd}
      </p>
      <p xs={12} className="mb-0">
        {props.Order.event_address}
      </p>
    </Col>
  )
}

export default OrderSellerTimeHeader
