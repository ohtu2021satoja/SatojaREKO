import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EventPageListButtons from "./EventPageListButtons"
import { addProductToCart, removeProductFromCart } from "../reducers/shoppingCart"
import { useDispatch } from "react-redux"

const EventPageListItem = ({ product, event }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (size) => {
    dispatch(addProductToCart(product, size, event))
  }

  const handleRemoveFromCart = (size) => {
    dispatch(removeProductFromCart(product, size, event))
  }

  return (
    <Accordion className="mb-2">
      <Card>
        <Accordion.Toggle as={Button} variant="text" eventKey="0">
          <Row>
            <Col xs={4}>
              <Card.Img src="https://via.placeholder.com/50" alt="Generic placeholder" />
            </Col>
            <Col xs={8} className="text-left">
              <Card.Subtitle className="mb-2 text-muted">Myyjä X</Card.Subtitle>
              <Card.Title>{product.name}</Card.Title>
              <Card.Title>
                {product.unit_price / 100}e / {product.type}
              </Card.Title>
            </Col>
          </Row>
          <Accordion.Collapse as="div" eventKey="0">
            <Row>
              <Col xs={4}>
                <Card.Text className="text-left">{product.description}</Card.Text>
              </Col>
              {product.sizes.map((size, index) => (
                <EventPageListButtons
                  addToCart={handleAddToCart}
                  removeFromCart={handleRemoveFromCart}
                  eventID={event.id}
                  size={size}
                  unit={product.type}
                  key={index}
                />
              ))}
            </Row>
          </Accordion.Collapse>
        </Accordion.Toggle>
      </Card>
    </Accordion>
  )
}

export default EventPageListItem
