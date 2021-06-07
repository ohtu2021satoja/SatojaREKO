import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Accordion from "react-bootstrap/Accordion"
import ListGroupItem from "react-bootstrap/esm/ListGroupItem"
import ListGroup from "react-bootstrap/esm/ListGroup"

const OrdersSellerBuyers = () => {
  // example products
  const orderers = [
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
        <ListGroupItem>
          <Row key={index}>
            <Col>{product.name}</Col>
            <Col>{product.sold}</Col>
            <Col>{product.price * product.sold}€</Col>
            <Col>
              <Card.Img onClick={HandleDeleteProductButton} src="generic photo"/> Delete
            </Col>
          </Row>
        </ListGroupItem>
      )
  }

  const HandleDeleteProductButton = () => {
    console.log("deletes this product")
  }
  const HandleDeleteOrderButton = () => {
    console.log("deletes this order")
  }

  const renderBuyers = (buyer, index) => {
    return (
      <Accordion className="mb-2" key={index}>
        <Card>
          <Accordion.Toggle as={Button} variant="text" eventKey="0">
            <Row>
              <Col xs={8} className="text-left">
                <Card.Title style={{textDecorationLine: "underline"}}>{buyer.name}
                </Card.Title>
                <Card.Title>{buyer.id}</Card.Title>
              </Col>
            </Row>
            <Accordion.Collapse eventKey="0">
              <Col>
                <ListGroup>
                  <Row className="mt-5">
                    <Col><h6>Varauskori:</h6></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                    <Row>
                      <Col>Tuote</Col>
                      <Col>Määrä.</Col>
                      <Col>Hinta</Col>
                      <Col>     </Col>
                    </Row>
                  {products.map(renderProducts)}
                    <Row className="mt-5">
                      <Col><h6>YHTEENSÄ</h6></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                    </Row>
                    <Row>
                      <Col>xxx,xx€</Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                    </Row>
                    <Row>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col>
                      <Card.Img onClick={HandleDeleteOrderButton} src="generic photo"/> Delete tilaus
                      </Col>
                    </Row>
                  </ListGroup>
                </Col>
              
            </Accordion.Collapse>
          </Accordion.Toggle>
        </Card>
      </Accordion>
    )
  }

  return (
    <div>
      {orderers.map(renderBuyers)}
    </div>
  )
}

export default OrdersSellerBuyers