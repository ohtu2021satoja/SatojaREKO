import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { useState } from "react"

const OrdersBuyerProducts = (props) => {
  const event = props.location.state.event
  console.log("EVENT IN OBP: ", event)
  const RenderProducts = (product, index) => {
    return (
      <Card key={index}>
        <Row>
          <Col>
            <Card.Img src={product.image} alt="Generic placeholder" rounded="true" />
          </Col>
          <Col xs={8} className="text-left">
            <Card.Title>{product.seller}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{product.name}</Card.Subtitle>
            <Card.Subtitle className="text-muted">{product.text}</Card.Subtitle>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>{product.type}</h5>
          </Col>
          <Col>
            <h5>{product.amount * product.price}€</h5>
          </Col>
        </Row>
      </Card>
    )
  }

  return <div>{event.orders.map(RenderProducts)}</div>
}

export default OrdersBuyerProducts
