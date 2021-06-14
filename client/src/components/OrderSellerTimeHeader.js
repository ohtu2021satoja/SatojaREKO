import Col from "react-bootstrap/esm/Col"

const OrderSellerTimeHeader = (props) => {
  return (
    <div>
      <Col xs={12} className="text-center">
        <h6>{props.x.name}</h6>
      </Col>
      <Col xs={12} className="text-center">
        <h6>
          {props.datepaiva} {props.thisDate}.{props.month}.
        </h6>
      </Col>
      <Col xs={12} className="text-center">
        <h6>
          {props.dateHour}:{props.dateMinutes}-
        </h6>
      </Col>
      <Col xs={12} className="text-center">
        <h6>{props.x.address}</h6>
      </Col>
    </div>
  )
}

export default OrderSellerTimeHeader
