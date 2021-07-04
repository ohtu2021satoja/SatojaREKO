import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import OrdersBuyerNav from "./OrdersBuyerNav"
import EventInfoLabel from "./EventInfoLabel"
import OrganicLabel from "./OrganicLabel"
import { Link } from "react-router-dom"

const OrdersBuyerProducts = (props) => {
  const event = props.location.state.event

  const RenderProducts = (product, index) => {
    return (
      <Card key={index} className="mb-2 p-1">
        <Row className="align-items-center">
          <Col xs={4}>
            <Card.Img
              src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_500/${product.product_image_url}`}
              alt="Generic placeholder"
              rounded="true"
            />
            {product.organic && <OrganicLabel onOrdersPage={true} />}
          </Col>
          <Col xs={8} className="mb-3 pt-2 text-start">
            <Card.Subtitle
              className="d-flex justify-content-between text-muted unstyled-link"
              as={Link}
              to={{
                pathname: `/sellers/${product.seller_id}`,
                state: {
                  linkTo: {
                    pathname: `/orders/buyer/${event.id ? event.id : event.event_id}`,
                    state: { event: event },
                  },
                },
              }}
            >
              {(() => {
                let sellerName = ""
                if (product.seller_name) {
                  sellerName = product.seller_name
                } else {
                  sellerName = product.seller_firstname + " " + product.seller_lastname
                }
                if (!product.removed) {
                  return <p>{sellerName}</p>
                } else return <del>{sellerName}</del>
              })()}
              <i className="bi bi-chevron-right"></i>
            </Card.Subtitle>
            <Card.Title className="mb-1">
              {product.removed ? (
                <del>{product.product_name}</del>
              ) : (
                product.product_name + " " + product.size + " " + product.type
              )}
            </Card.Title>
          </Col>
          <Col xs={{ span: 4, offset: 4 }}>
            <p>
              {product.removed ? (
                <del>
                  {" "}
                  {product.size} {product.type}
                </del>
              ) : (
                product.quantity + " kpl"
              )}
            </p>
          </Col>
          <Col>
            <h5>
              {product.removed ? (
                <del>{(product.price * product.quantity) / 100}</del>
              ) : (
                (product.price * product.quantity) / 100
              )}
              €
            </h5>
          </Col>
        </Row>
      </Card>
    )
  }

  return (
    <Row className="mb-5 pb-5 bg-light-blue">
      <OrdersBuyerNav
        navLink="/orders/buyer"
        altText="Takaisin tilauksiin"
        navHeader="Noudot"
      />
      <Col xs={12} className="mb-3 pb-0 mt-3 text-center " styles={{ marginBottom: 0 }}>
        <EventInfoLabel
          market={event.market}
          event={event}
          classes="mb-0 mt-0"
          styles={{ fontSize: 16 }}
        />
      </Col>
      {event.orders.map(RenderProducts)}
      <Col xs={12} className="d-flex justify-content-between mb-0 mt-2">
        <h5>YHTEENSÄ</h5>{" "}
        <h5>
          {Math.round(
            event.orders.reduce((acc, product) => {
              if (!product.removed) {
                return acc + product.price * product.quantity
              }
              return acc
            }, 0) * 100
          ) / 10000}
          e
        </h5>
      </Col>
    </Row>
  )
}

export default OrdersBuyerProducts
