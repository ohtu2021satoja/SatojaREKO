import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EventPageListButtons from "./EventPageListButtons"
import { addProductToCart, removeProductFromCart } from "../actions/shoppingCart"
import { useDispatch } from "react-redux"

const EventPageListItem = ({ product, event, openProductPage, closeProductPage }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (size) => {
    dispatch(addProductToCart(product, size, event))
  }

  const handleRemoveFromCart = (size) => {
    dispatch(removeProductFromCart(product, size, event))
  }

  return (
    <Card className="mb-1 py-2 px-2">
      <Row
        onClick={() =>
          openProductPage(product, event, handleAddToCart, handleRemoveFromCart)
        }
      >
        <Col xs={4}>
          <Card.Img src="https://via.placeholder.com/50" alt="Generic placeholder" />
        </Col>
        <Col xs={8} className="text-left">
          <Card.Subtitle className="d-flex justify-content-between text-muted">
            <p>Myyjä X</p>
            <i className="bi bi-chevron-right"></i>
          </Card.Subtitle>
          <Card.Title>{product.name}</Card.Title>
          <Card.Title>
            {product.unit_price / 100}e / {product.type}
          </Card.Title>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <Card.Text className="text-left">{product.description}</Card.Text>
        </Col>
        {product.sizes.length > 1 ? (
          <Col xs={8} className="d-flex justify-content-end">
            <Button
              size="lg"
              variant="light"
              onClick={() =>
                openProductPage(product, event, handleAddToCart, handleRemoveFromCart)
              }
            >
              <i className="bi bi-card-list"></i> Eri kokoja
            </Button>
          </Col>
        ) : (
          <EventPageListButtons
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            eventID={event.id}
            size={product.sizes[0]}
            unit={product.type}
          />
        )}
      </Row>
    </Card>
  )
}

export default EventPageListItem
