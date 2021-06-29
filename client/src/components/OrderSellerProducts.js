import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Accordion from "react-bootstrap/Accordion"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem from "react-bootstrap/esm/ListGroupItem"

const OrdersSellerProducts = (props) => {
  /*
  const HandleSingleBuyerButton = () => {
    props.setListView(false)
  }
  */

  const renderOrders = (product, index) => {
    return (
      <Accordion className="mb-1" key={index}>
        <Card>
          <Accordion.Toggle as={Button} variant="text" eventKey="0">
            <Row className="flex-nowrap align-items-center">
              <Col xs={4}>
                <Card.Img src={product.image} alt="product image" />
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
                <ListGroupItem className="border-0 px-0 pt-3 text-left">
                  <Row clasName="flex-nowrap align-items-center">
                    <Col xs={9}>
                      <Card.Text className="mb-1">Esko Erkkilä</Card.Text>
                      <Card.Text>Tilausnumero: 53214678</Card.Text>
                    </Col>
                    <Col xs={3}>
                      <Button
                        type="button"
                        variant="outline-light"
                        area-label="Katso tilaajan tilaus"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-caret-right-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                        </svg>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Accordion.Collapse>
          </Accordion.Toggle>
        </Card>
      </Accordion>
    )
  }
  return <div>{props.orderProducts.map(renderOrders)}</div>
}

export default OrdersSellerProducts
