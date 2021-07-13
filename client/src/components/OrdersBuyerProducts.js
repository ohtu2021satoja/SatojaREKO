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
      <Card key={index} className="mb-2 p-2">
        <Row>
          <Col xs={4}>
            <div style={{ position: "relative" }}>
              <Card.Img
                src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_500/${product.product_image_url}`}
                alt="Product image"
                rounded
              />
              {product.organic && <OrganicLabel onOrdersPage={true} />}
            </div>
          </Col>
          <Col xs={8} className="mb-3 pt-2 text-left">
            <Row
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
              className="mb-2 pr-3 justify-content-between text-decoration-none text-muted"
            >
              {(() => {
                let sellerName = ""
                if (product.seller_name) {
                  sellerName = product.seller_name
                } else {
                  sellerName = product.seller_firstname + " " + product.seller_lastname
                }
                if (!product.removed) {
                  return <Card.Subtitle>{sellerName}</Card.Subtitle>
                } else
                  return (
                    <Card.Subtitle className="text-decoration-line-through">
                      {sellerName}
                    </Card.Subtitle>
                  )
              })()}

              <Card.Subtitle>
                <i className="bi bi-chevron-right"></i>
              </Card.Subtitle>
            </Row>
            <Row className="pr-5 flex-column text-decoration-none text-body">
              <Card.Title>
                {product.removed ? (
                  <del>{product.product_name}</del>
                ) : (
                  product.product_name + " " + product.size + " " + product.type
                )}
              </Card.Title>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 4, offset: 4 }} className="pl-0">
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
          <Col xs={4} className="text-right">
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
    <Row className="mb-5 pb-5 h-100 bg-light-blue">
      <OrdersBuyerNav
        navLink="/orders/buyer"
        altText="Takaisin tilauksiin"
        navHeader="Noudot"
      />
      <Col xs={12} className="mb-3 pb-0 mt-3 text-center">
        <EventInfoLabel
          market={event.market}
          event={event}
          classes="mb-0 mt-0"
          styles={{ fontSize: 16 }}
        />
      </Col>
      <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
        {event.orders.map(RenderProducts)}
      </Col>
      <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
        <Row className="mx-2 justify-content-between">
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
        </Row>
      </Col>
    </Row>
  )
}

export default OrdersBuyerProducts
