import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Accordion from "react-bootstrap/Accordion"
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
      <Row key={index}>
        <Col
          xs={8}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
          xl={{ span: 4, offset: 4 }}
        >
          <Accordion defaultActiveKey="1">
            <Card as={Col}>
              <Accordion.Toggle as={Button} variant="text" eventKey="0">
                <Row>
                  <Col>
                    <Card.Img src={product.image} alt="Generic placeholder" />
                  </Col>
                  <Col xs={8} className="text-left">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>tilattu {product.sold}kpl</Card.Text>
                  </Col>
                </Row>
                <Accordion.Collapse eventKey="0">
                  <Col>
                    <p>
                      asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd
                      asd asd asd asd
                    </p>
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
        <Nav variant="pills" defaultActiveKey="#Tuotteet">
          <Nav.Item>
            <Nav.Link href="#Tuotteet">Tuotteet</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#Tilaajat">Tilaajat</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      {orders.map(renderOrders)}
    </div>
  )
}

export default OrdersSeller
