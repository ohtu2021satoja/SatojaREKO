import { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Nav from "react-bootstrap/Nav"

const products = [
  {
    id: 14,
    name: "Omenoita",
    organic: true,
    sellers_id: 1,
    type: "kg",
    batch_quantity: 9,
    created_at: "2021-06-01T10:36:00.129Z",
    description: "Halpoja omenoita",
    close_before_event: 24,
    unit_price: 1250,
    image_url: "porkkana_okbtuk",
    category: "Hedelmät & marjat",
    quantity_left: "7",
    sizes: [{ quantity: 7, unit: 1.25 }],
  },
  {
    id: 11,
    name: "Kalakukkova",
    organic: true,
    sellers_id: 1,
    type: "kg",
    batch_quantity: 15,
    created_at: "2021-06-01T10:36:00.129Z",
    description: "hyvvee kukkova",
    close_before_event: 24,
    unit_price: 750,
    image_url: "porkkana_okbtuk",
    category: "Leivät & leivonta",
    quantity_left: "7",
    sizes: [{ quantity: 10, unit: 0.5 }],
  },
  {
    id: 3,
    name: "Mansikkaa",
    organic: true,
    sellers_id: 1,
    type: "kg",
    batch_quantity: 12,
    created_at: "2021-06-01T10:36:00.129Z",
    description: "mansikoita",
    close_before_event: 24,
    unit_price: 1500,
    image_url: "porkkana_okbtuk",
    category: "Hedelmät & marjat",
    quantity_left: "7",
    sizes: [{ quantity: 12, unit: 1.0 }],
  },
]

const ListItem = ({ product }) => {
  const [amountInCart, setAmountInCart] = useState(0)

  return (
    <Accordion className="mb-2">
      <Card>
        <Accordion.Toggle as={Button} variant="text" eventKey="0">
          <Row>
            <Col xs={4}>
              <Card.Img src="https://via.placeholder.com/50" alt="Generic placeholder" />
            </Col>
            <Col xs={8} className="text-left">
              <Card.Subtitle className="mb-2 text-muted">Myyjä X</Card.Subtitle>
              <Card.Title>
                {product.name} {product.sizes[0].unit} {product.type}
              </Card.Title>
              <Card.Title>{product.unit_price / 100}e / kpl</Card.Title>
            </Col>
          </Row>
          <Accordion.Collapse as="div" eventKey="0">
            <div>
              <Button
                size="sm"
                variant="success"
                onClick={(e) => {
                  e.stopPropagation()
                  setAmountInCart(amountInCart - 1)
                }}
              >
                -
              </Button>{" "}
              {amountInCart}{" "}
              <Button
                size="sm"
                variant="success"
                onClick={(e) => {
                  e.stopPropagation()
                  setAmountInCart(amountInCart + 1)
                }}
              >
                +
              </Button>
            </div>
          </Accordion.Collapse>
        </Accordion.Toggle>
      </Card>
    </Accordion>
  )
}

const EventPage = ({ event, closePage }) => {
  return (
    <Row className="h-100">
      <Col xs={12}>
        <Nav className="py-2">
          <Nav.Item>
            <Button
              variant="light"
              size="lg"
              className="mr-1"
              aria-label="Return to map"
              onClick={closePage}
            >
              <i className="bi bi-arrow-left" />
            </Button>
          </Nav.Item>
        </Nav>
      </Col>
      <Col xs={12} className="text-center mb-4">
        <p>Noutotilaisuus paikassa {event.address}</p>
      </Col>
      <Col xs={12} className="mx-auto">
        {products.map((product, index) => (
          <ListItem product={product} key={index} />
        ))}
      </Col>
    </Row>
  )
}

export default EventPage
