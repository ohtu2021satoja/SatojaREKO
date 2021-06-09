import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Accordion from "react-bootstrap/Accordion"
import OrdersSellerBuyers from "./OrdersSellerBuyers"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem from "react-bootstrap/esm/ListGroupItem"

const OrdersSellerProducts = (props) => {
  // example products
  const orderProducts = [
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
  const HandleSingleBuyerButton = () => {
    props.setListView(false)
    console.log("buyer card opens")
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
    return <div>{orderProducts.map(renderOrders)}</div>
  } else {
    return (
      <div>
        <OrdersSellerBuyers />
      </div>
    )
  }
}

export default OrdersSellerProducts
