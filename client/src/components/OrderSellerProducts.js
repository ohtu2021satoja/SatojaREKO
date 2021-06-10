import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Accordion from "react-bootstrap/Accordion"
import OrdersSellerBuyers from "./OrderSellerBuyers"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem from "react-bootstrap/esm/ListGroupItem"

const OrdersSellerProducts = (props) => {
  const HandleSingleBuyerButton = () => {
    props.setListView(false)
  }

  const renderOrders = (product, index) => {
    return (
      <Accordion className="mb-2" key={index}>
        <Card>
          <Accordion.Toggle as={Button} variant="text" eventKey="0">
            <Row>
              <Col>
                <Card.Img src={product.image} alt="Generic placeholder" />
              </Col>
              <Col xs={8} className="text-left">
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Myyty: {product.sold}/{product.soldlimit} kpl
                </Card.Subtitle>
              </Col>
            </Row>
            <Accordion.Collapse eventKey="0">
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col>Esko Erkkilä</Col>
                    <Col>
                      <Card.Img onClick={HandleSingleBuyerButton} src="tilaajaan.jpg" />
                      tilaajaan
                    </Col>
                  </Row>
                  <Row>
                    <Col>Tilausnumero: 53214678</Col>
                    <Col></Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Accordion.Collapse>
          </Accordion.Toggle>
        </Card>
      </Accordion>
    )
  }
  if (props.ListView) {
    return <div>{props.orderProducts.map(renderOrders)}</div>
  } else {
    return (
      <div>
        <OrdersSellerBuyers
          orderProducts={props.orderProducts}
          orderers={props.orderers}
          setBuyerInfo={props.setBuyerInfo}
          buyerInfo={props.buyerInfo}
        />
      </div>
    )
  }
}

export default OrdersSellerProducts
