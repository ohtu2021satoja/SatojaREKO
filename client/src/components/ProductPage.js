import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import ProductPageListButtons from "./ProductPageListButtons"
import BackButtonHeader from "./BackButtonHeader"
import OrganicLabel from "./OrganicLabel"
import { useDispatch } from "react-redux"
import { addProductToCart, removeProductFromCart } from "../actions/shoppingCart"
import { Link } from "react-router-dom"
import { getEventProduct } from "../services/events"
import { useParams } from "react-router-dom"

const ProductPage = (props) => {
  const { eventID } = useParams()
  const { productID } = useParams()

  const product = props.location.state.product
  const event = props.location.state.event
  const market = props.location.state.market
  const linkTo = props.location.state.linkTo
  const singleSize = product.sizes.length === 1

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
    <Row className="bg-light-yellow product-page-row" style={{ paddingBottom: 100 }}>
      <BackButtonHeader linkTo={linkTo} />
      <Col
        xs={12}
        className="d-flex justify-content-start align-items-center mb-4 seller-link"
        as={Link}
        to={sellerPageLink}
      >
        <Image
          src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_50/${product.seller_image_url}`}
          alt="Generic placeholder"
        />{" "}
        <h4 className="mt-2 ml-2">
          {product.seller_name
            ? product.seller_name
            : product.seller_firstname + " " + product.seller_lastname}
        </h4>
      </Col>
      <Col xs={12} className="text-center mb-2">
        <Image
          src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_200/${product.image_url}`}
          alt="Generic placeholder"
        />{" "}
        {product.organic && <OrganicLabel onProductPage={true} />}
      </Col>
      <Col xs={12} className="text-center mb-0">
        <h4>
          {singleSize
            ? product.name + " " + product.sizes[0].unit + " " + product.type
            : product.name}
        </h4>
      </Col>
      <Col xs={12} className="text-center">
        <p>{product.description}</p>
      </Col>
      {!singleSize && (
        <Col xs={12} className="text-center mb-2">
          <h4>
            {product.unit_price / 100}e / {product.type}
          </h4>
        </Col>
      )}
      {product.sizes.map((size, index) => {
        return (
          <ProductPageListButtons
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            eventID={event.id ? event.id : event.event_id}
            size={size}
            unit={product.type}
            singleSize={singleSize}
            key={index}
          />
        )
      })}
    </Row>
  )
}

export default ProductPage
