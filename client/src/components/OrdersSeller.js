import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Nav from "react-bootstrap/Nav"

const OrdersSeller = () => {
  // example products
  const orders = [
    {
      name: "mansikka 5kg laatikko",
      sold: 5,
      soldlimit: 10,
      price: 52,
      image: "https://www.satotukku.fi//i/t/mansikka.8ee8a02c75.jpg",
    },
    {
      name: "herne 1 litra",
      sold: 3,
      soldlimit: 15,
      price: 23,
      image: "http://www.hankkija.fi/Liitetiedostot/Pics/herneetw900.jpg",
    },
    {
      name: "naudan sisäfile",
      sold: 2,
      soldlimit: 4,
      price: 66,
      image: "https://www.wotkins.fi/wp-content/uploads/2016/05/naudan_sisafilee.jpg",
    },
  ]

  const renderOrders = (product, index) => {
    return (
      <Accordion className="mb-2" key={index} flush>
        <Card>
          <Accordion.Toggle as={Button} variant="text" eventKey="0">
            <Row>
              <Col>
                <Card.Img src={product.image} alt="Generic placeholder" />
              </Col>
              <Col xs={8} className="text-left">
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  tilattu {product.sold}kpl
                </Card.Subtitle>
              </Col>
            </Row>
            <Accordion.Collapse eventKey="0">
              <Card.Text className="pt-2">
                asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd
                asd asd asd
              </Card.Text>
            </Accordion.Collapse>
          </Accordion.Toggle>
        </Card>
      </Accordion>
    )
  }

  return (
    <Row className="mt-5">
      <Col xs={12} className="text-center mb-4">
        <h2>Tilaukset</h2>
      </Col>
      <Col xs={12}>
        <Nav fill variant="tabs" defaultActiveKey="#Tuotteet">
          <Nav.Item>
            <Nav.Link href="#Tuotteet">Tuotteet</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#Tilaajat">Tilaajat</Nav.Link>
          </Nav.Item>
        </Nav>

        {orders.map(renderOrders)}
      </Col>
    </Row>
  )
}

export default OrdersSeller
