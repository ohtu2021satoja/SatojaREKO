import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Accordion from "react-bootstrap/Accordion"

const Products = () => {
  // example products
  const tuotteet = [
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

  const renderProducts = (product, index) => {
    return (
      <Accordion className="mb-2" key={index}>
        <Accordion.Toggle as={Button} className="p-0" variant="text" eventKey="0">
          <Card>
            <Card.Header>
              <h3>{product.name}</h3>
            </Card.Header>
            <Card.Img src={product.image} />
            <Accordion.Collapse eventKey="0">
              <Card.Body className="text-center">
                <Card.Text>
                  myyty {product.sold}/{product.soldlimit}
                  <br />
                  Hinta {product.price}€
                </Card.Text>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion.Toggle>
      </Accordion>
    )
  }
  return (
    <Row className="mt-5">
      <Col xs={12} className="text-center mb-4">
        <h2>Tuotteet</h2>
      </Col>
      <Col xs={12}>{tuotteet.map(renderProducts)}</Col>
    </Row>
  )
}

export default Products
