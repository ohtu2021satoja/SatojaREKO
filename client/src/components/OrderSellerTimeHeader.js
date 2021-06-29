import Col from "react-bootstrap/Col"

const OrderSellerTimeHeader = (props) => (
  <Col xs={12} className="py-4 text-center">
    <h4 className="mb-0">{props.x.name}</h4>
    <p className="mb-0">
      {props.datepaiva} {props.thisDate}.{props.month}.
    </p>
    <p className="mb-0">
      {props.dateHour}:{props.dateMinutes}-
    </p>
    <p>{props.x.address}</p>
  </Col>
)

export default OrderSellerTimeHeader
