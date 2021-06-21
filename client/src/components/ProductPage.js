import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProductPageListButtons from "./ProductPageListButtons"
import BackButtonHeader from "./BackButtonHeader"
import { useDispatch } from "react-redux"
import { addProductToCart, removeProductFromCart } from "../actions/shoppingCart"

const ProductPage = (props) => {
  const product = props.location.state.product
  const event = props.location.state.event

  const dispatch = useDispatch()

  const handleAddToCart = (size) => {
    dispatch(addProductToCart(product, size, event))
  }

  const handleRemoveFromCart = (size) => {
    dispatch(removeProductFromCart(product, size, event))
  }

  return (
    <Row className="mx-auto">
      <BackButtonHeader
        linkTo={{
          pathname: `/events/${event.id}`,
          state: { event: event },
        }}
      />
      <Col xs={12} className="d-flex justify-content-start align-items-center mb-4">
        <img src="https://via.placeholder.com/60" alt="Generic placeholder" />{" "}
        <h4 className="mt-2 ml-2">Myyjä X</h4>
      </Col>
      <Col xs={12} className="text-center mb-2">
        <img src="https://via.placeholder.com/150" alt="Generic placeholder" />{" "}
      </Col>
      <Col xs={12} className="text-center mb-0">
        <h4>{product.name}</h4>
      </Col>
      <Col xs={12} className="text-center">
        <p>{product.description}</p>
      </Col>
      <Col xs={12} className="text-center mb-2">
        <h4>
          {product.unit_price / 100}e / {product.type}
        </h4>
      </Col>
      {product.sizes.map((size, index) => {
        return (
          <ProductPageListButtons
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
            eventID={event.id}
            size={size}
            unit={product.type}
            key={index}
          />
        )
      })}
    </Row>
  )
}

export default ProductPage
