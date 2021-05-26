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
      <Accordion
        defaultActiveKey="1"
        as={Col}
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
        xl={{ span: 4, offset: 4 }}
        key={index}>
        <Accordion.Toggle as={Button} variant="text" eventKey="0">
          <Card>
            <Card.Header>
              <h4>{product.name}</h4>
            </Card.Header>
            <Card.Img variant="top" src={product.image}/>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Row className="justify-content-md-center">
                  myyty {product.sold}/{product.soldlimit}
                </Row>
                  Hinta {product.price}€
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion.Toggle>
      </Accordion>
    )
  }
  return (
    <div>
      <Row className="justify-content-md-center">
        <h1>Tuotteet</h1>
      </Row>
      {tuotteet.map(renderProducts)}
    </div>
  )
}

export default Products
