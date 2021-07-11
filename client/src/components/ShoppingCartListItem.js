import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useDispatch } from "react-redux"
import { addProductToCart, removeProductFromCart } from "../actions/shoppingCart"
import ShoppingCartListButtons from "./ShoppingCartListButtons"
import OrganicLabel from "./OrganicLabel"
import { Link } from "react-router-dom"

const ShoppingCartListItem = ({ event, sizes, product }) => {
  const singleSize = product.singleSize

  const dispatch = useDispatch()

  const handleAddToCart = (batch) => {
    if (batch.order_quantity < batch.quantity)
      dispatch(addProductToCart(batch.product, batch, event))
  }

  const handleRemoveFromCart = (batch) => {
    dispatch(removeProductFromCart(batch.product, batch, event))
  }

  const productPageLink = {
    pathname: `/events/${event.id ? event.id : event.event_id}/products/${product.id}`,
    state: {
      event: event,
      product: product,
      market: event.market,
      singleSize: singleSize,
      linkTo: {
        pathname: `/cart`,
        state: {},
      },
    },
  }

  const sellerPageLink = {
    pathname: `/sellers/${product.sellers_id}`,
    state: {
      linkTo: {
        pathname: `/cart`,
        state: {},
      },
    },
  }

  return (
    <Card className="mb-3 py-2 px-2  bg-white border-0">
      <Row>
        <Col xs={4} as={Link} to={productPageLink}>
          <div style={{ position: "relative" }}>
            <Card.Img
              src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_500/${product.image_url}`}
              alt="Generic placeholder"
            />
            {product.organic && <OrganicLabel />}
          </div>
        </Col>
        <Col xs={8}>
          <Row
            className="pr-3 pt-2 justify-content-between text-muted text-decoration-none"
            as={Link}
            to={sellerPageLink}
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
            className="text-decoration-none text-body"
            styles={{ fontSize: "1.5rem" }}
          >
            <Card.Title>
              {singleSize
                ? product.name + " " + product.sizes[0].unit + " " + product.type
                : product.name + " " + product.unit_price / 100 + "e / " + product.type}
            </Card.Title>
          </Row>
        </Col>
      </Row>
      <Row>
        {sizes.map((size, index) => (
          <ShoppingCartListButtons
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            eventID={event.id ? event.id : event.event_id}
            size={size}
            unit={product.type}
            key={index}
            singleSize={singleSize}
          />
        ))}
      </Row>
    </Card>
  )
}

export default ShoppingCartListItem
