import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EventPageListButtons from "./EventPageListButtons"
import OrganicLabel from "./OrganicLabel"
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
    <Card className="mb-2 p-2">
      <Row>
        <Col xs={4} as={Link} to={productPageLink}>
          <div style={{ position: "relative" }}>
            <Card.Img
              src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_500/${product.image_url}`}
              alt="Generic placeholder"
              rounded
            />
            {product.organic && <OrganicLabel />}
          </div>
        </Col>
        <Col xs={8} className="pt-2 text-left">
          <Row
            as={Link}
            to={sellerPageLink}
            className="mb-2 pr-3 justify-content-between text-decoration-none text-muted"
          >
            <Card.Subtitle>
              {product.seller_name
                ? product.seller_name
                : product.seller_firstname + " " + product.seller_lastname}
            </Card.Subtitle>
            <Card.Subtitle>
              <i className="bi bi-chevron-right"></i>
            </Card.Subtitle>
          </Row>
          <Row
            as={Link}
            to={productPageLink}
            className="pr-5 flex-column text-decoration-none text-body"
          >
            <Card.Title className="mb-0">
              {singleSize
                ? product.name + " " + product.sizes[0].unit + " " + product.type
                : product.name}
            </Card.Title>
            {!singleSize && (
              <Card.Title>
                {" "}
                {product.unit_price / 100 + "e / " + product.type}{" "}
              </Card.Title>
            )}
          </Row>
        </Col>
      </Row>
      <Row>
        {singleSize ? (
          <Col xs={12}>
            <EventPageListButtons
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
              eventID={event.id ? event.id : event.event_id}
              size={product.sizes[0]}
              unit={product.type}
            />
          </Col>
        ) : (
          <Col xs={12} className="text-right">
            <Button
              size="lg"
              variant="light"
              as={Link}
              to={productPageLink}
              className="text-decoration-none"
            >
              <i className="bi bi-card-list"></i> Eri kokoja
            </Button>
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default EventPageListItem
