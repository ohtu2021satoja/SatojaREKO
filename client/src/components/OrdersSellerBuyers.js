import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Accordion from "react-bootstrap/Accordion"
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom"

const OrdersSellerBuyers = () => {
  // example products
  const orders = [
    {
      name: "John Dillinger",
      id: 189226,
      soldlimit: 10,
      price: 52,
    },
    {
      name: "Bonnie Parker",
      id: 367979,
      soldlimit: 15,
      price: 23,
    },
    {
      name: "Clyde Barrow",
      id: 2235235,
      soldlimit: 4,
      price: 66,
    },
  ]
  const products = [
    {
      name: "mansikka 5kg",
      sold: 5,
      price: 52,
    },
    {
      name: "herne 1L",
      sold: 3,
      price: 23,
    },
    {
      name: "naudan sisäfile",
      sold: 2,
      price: 66,
    },
  ]
  const renderProducts = (product, index) => {
      return(
        <Row key={index}>
        <Col>
           <p>{product.name}</p>
        </Col>
        <Col>
            <p>{product.sold}</p>
        </Col>
        <Col>
            <p>{product.price * product.sold}€</p>
        </Col>
        </Row>
      )
  }

  const renderOrders = (buyer, index) => {
    return (
      <Row key={index}>
        <Col
        xs={8}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
        xl={{ span: 4, offset: 4 }}>
          <Accordion defaultActiveKey="1">
            <Card as={Col}>
              <Accordion.Toggle as={Button} variant="text" eventKey="0">
                <Row>
                  
                  <Col xs={8} className="text-left">
                    <Card.Title>
                      {buyer.name} <div></div> {buyer.id}
                    </Card.Title>
                  </Col>
                </Row>
                <Accordion.Collapse eventKey="0">
                  <Col>
                    <Row>
                      <Col>Tuote</Col>
                      <Col>Määrä</Col>
                      <Col>Hinta</Col>
                    </Row>
                    {products.map(renderProducts)}
                  </Col>
                </Accordion.Collapse>
              </Accordion.Toggle>
            </Card>
          </Accordion>
        </Col>
      </Row>
    )
  }

  return (
    <div>
      <Row className="justify-content-md-center">
        <h1>Tilaukset</h1>
      </Row>
      <Row className="justify-content-md-center">
        <h6>generic (REKO)</h6>
      </Row>
      <Row className="justify-content-md-center">
        <h6>generic DATE</h6>
      </Row>
      <Row className="justify-content-md-center">
          <h6>generic TIME</h6>
      </Row>
      <Row className="justify-content-md-center">
          <h6>generic ADDRESS</h6>
      </Row>
      <Row className="justify-content-md-center">
        <Nav variant="pills" defaultActiveKey="2">
          <Nav.Item>
            <Nav.Link as={Link} eventKey="1" to="/orderproducts" >Tuotteet</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link as={Link} eventKey="2" to="/orderbuyers" >Tilaajat</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      {orders.map(renderOrders)}
    </div>
  )
}

export default OrdersSellerBuyers