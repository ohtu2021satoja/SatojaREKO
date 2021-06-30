import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import OrdersBuyerNav from "./OrdersBuyerNav"
import EventInfoLabel from "./EventInfoLabel"

const OrdersBuyerProducts = (props) => {
  const event = props.location.state.event

  const RenderProducts = (product, index) => {
    return (
      <Card key={index} className="mb-2 p-1">
        <Row className="align-items-center">
          <Col xs={4}>
            <Card.Img
              src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_50/${product.product_image_url}`}
              alt="Generic placeholder"
              rounded="true"
            />
          </Col>
          <Col xs={8} className="mb-3 text-left">
            <Card.Subtitle className="mb-2 text-muted">
              {(() => {
                let sellerName = ""
                if (product.seller_name) {
                  sellerName = product.seller_name
                } else {
                  sellerName = product.seller_firstname + " " + product.seller_lastname
                }
                if (!product.removed) {
                  return sellerName
                } else return <del>{sellerName}</del>
              })()}
            </Card.Subtitle>
            <Card.Title className="mb-0">
              {product.removed ? <del>{product.product_name}</del> : product.product_name}
            </Card.Title>
          </Col>
          <Col xs={10} className="mb-1 text-end">
            <Card.Subtitle className="text-muted">
              {product.removed ? (
                <div style={{ color: "red" }}>TILAUS PERUTTU</div>
              ) : (
                product.description
              )}
            </Card.Subtitle>
          </Col>
          <Col xs={{ span: 4, offset: 4 }}>
            <p>
              {product.removed ? (
                <del>
                  {" "}
                  {product.size} {product.type}
                </del>
              ) : (
                product.size + " " + product.type
              )}
            </p>
          </Col>
          <Col>
            <h5>
              {product.removed ? <del>{product.price / 100}</del> : product.price / 100}€
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
        navHeader="Noutotilaus"
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
                return acc + product.price
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
