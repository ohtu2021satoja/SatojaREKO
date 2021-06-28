import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EventPageListButtons from "./EventPageListButtons"
import { addProductToCart, removeProductFromCart } from "../actions/shoppingCart"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const EventPageListItem = ({ product, event, market, singleSize }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (size) => {
    dispatch(
      addProductToCart({ ...product, singleSize: singleSize }, size, {
        ...event,
        market: market,
      })
    )
  }

  const handleRemoveFromCart = (size) => {
    dispatch(removeProductFromCart(product, size, { ...event, market: market }))
  }

  const productPageLink = {
    pathname: `/events/${event.id ? event.id : event.event_id}/products/${product.id}`,
    state: {
      event: event,
      product: product,
      market: market,
      singleSize: singleSize,
      linkTo: {
        pathname: `/events/${event.id ? event.id : event.event_id}`,
        state: { market: market, event: event },
      },
    },
  }

  const sellerPageLink = {
    pathname: `/sellers/${product.sellers_id}`,
    state: {
      linkTo: {
        pathname: `/events/${event.id ? event.id : event.event_id}`,
        state: { market: market, event: event },
      },
    },
  }

  return (
    <Card className="mb-1 py-2 px-2 ">
      <Row as={Link} to={productPageLink} className="unstyled-link">
        <Col xs={4}>
          <Card.Img src="https://via.placeholder.com/50" alt="Generic placeholder" />
        </Col>
        <Col xs={8} className="text-left">
          <Card.Subtitle
            className="d-flex justify-content-between text-muted unstyled-link"
            as={Link}
            to={sellerPageLink}
          >
            <p>{product.seller_name}</p>
            <i className="bi bi-chevron-right"></i>
          </Card.Subtitle>
          <Card.Title>
            {singleSize
              ? product.name + " " + product.sizes[0].unit + " " + product.type
              : product.name}
          </Card.Title>
          {!singleSize && (
            <Card.Title> {product.unit_price / 100 + "e / " + product.type} </Card.Title>
          )}
        </Col>
      </Row>
      <Row>
        {singleSize ? (
          <EventPageListButtons
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            eventID={event.id ? event.id : event.event_id}
            size={product.sizes[0]}
            unit={product.type}
          />
        ) : (
          <Col xs={12} className="d-flex justify-content-end">
            <Button size="lg" variant="light" as={Link} to={productPageLink}>
              <i className="bi bi-card-list"></i> Eri kokoja
            </Button>
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default EventPageListItem
