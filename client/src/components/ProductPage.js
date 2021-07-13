import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import ProductPageListButtons from "./ProductPageListButtons"
import TemplateTopNav from "./TemplateTopNav"
import OrganicLabel from "./OrganicLabel"
import { useDispatch } from "react-redux"
import { addProductToCart, removeProductFromCart } from "../actions/shoppingCart"
import { Link } from "react-router-dom"
//import { getEventProduct } from "../services/events"
//import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ProductPage = (props) => {
  const { eventID } = useParams()
  //const { productID } = useParams()
  /*

  const [event, setEvent] = useState(
    props.location.state ? props.location.state.event : null
  )
  const [market, setMarket] = useState(
    props.location.state ? props.location.state.market : null
  )
  const [product, setProduct] = useState(
    props.location.state ? props.location.state.market : null
  )
*/
  const product = props.location.state.product
  const event = props.location.state.event
  const market = props.location.state.market
  const linkTo = props.location.state.linkTo
  const singleSize = product.sizes.length === 1

  const dispatch = useDispatch()
  /*
  useEffect(() => {
    if (!event || !market || !product) {
      if (events.length === 0) {
        dispatch(receiveEvents())
      }
      const foundEvent = events.find((e) => Number(e.id) === Number(eventID))
      if (foundEvent) {
        setEvent(foundEvent)
        setMarket({
          id: foundEvent.market_id,
          start: foundEvent.start,
          endtime: foundEvent.endtime,
          address: foundEvent.address,
          type: foundEvent.type,
        })
      }
    }
    dispatch(receiveEventProducts(eventID))
  }, [dispatch, eventID, props.location.state, events, event, market])
*/

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
    <Row className="bg-light-yellow">
      <TemplateTopNav navLink={linkTo} altText="Palaa noutotilaisuuteen" />
      <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
        <Row
          as={Link}
          to={sellerPageLink}
          className="mb-3 py-2 px-4 align-items-center text-muted"
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
        </Row>
        <Row className="mb-5 justify-content-center">
          <Col xs={8} sm={6} className="mb-2 text-center">
            <Image
              src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_600/${product.image_url}`}
              alt="Generic placeholder"
              rounded
              fluid
            />{" "}
            {product.organic && <OrganicLabel onProductPage={true} />}
          </Col>
          <Col xs={12} className="mb-2 text-center">
            <h3>
              {singleSize
                ? product.name + " " + product.sizes[0].unit + " " + product.type
                : product.name}
            </h3>
            <p>{product.description}</p>
            {!singleSize && (
              <p>
                {product.unit_price / 100}e / {product.type}
              </p>
            )}
          </Col>
          <Col xs={12}>
            {product.sizes.map((size, index) => {
              return (
                <ProductPageListButtons
                  addToCart={handleAddToCart}
                  removeFromCart={handleRemoveFromCart}
                  eventID={eventID}
                  size={size}
                  unit={product.type}
                  singleSize={singleSize}
                  key={index}
                />
              )
            })}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ProductPage
