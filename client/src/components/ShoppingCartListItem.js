import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const ShoppingCartListItem = ({ batch }) => {
  return (
    <Card>
      <Row>
        <Col xs={4}>
          <Card.Img src="https://via.placeholder.com/50" alt="Generic placeholder" />
        </Col>
        <Col xs={8} className="text-left">
          <Card.Subtitle className="mb-2 text-muted">Myyjä X</Card.Subtitle>
          <Card.Title>
            {batch.product.name} {batch.unit * batch.order_quantity}
            {batch.product.type}
          </Card.Title>
          <Card.Title></Card.Title>
          <Card.Title>
            {(batch.product.unit_price * batch.unit * batch.order_quantity) / 100}e
          </Card.Title>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <Card.Text className="text-left">{batch.product.description}</Card.Text>
        </Col>
      </Row>
    </Card>
  )
}

export default ShoppingCartListItem
