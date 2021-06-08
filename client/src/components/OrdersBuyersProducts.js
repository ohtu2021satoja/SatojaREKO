import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { useState } from "react"

const OrdersBuyersProducts = () => {
  //example products
  const tuotteet = [
    {
      name: "mansikka 5kg laatikko",
      amount: 6,
      soldlimit: 10,
      price: 52,
      image: "https://www.satotukku.fi//i/t/mansikka.8ee8a02c75.jpg",
      type: "laatikko",
      text: "Luomu mansikkaa. lajike on polka ja makeita ovat. voit myös syödä jätskin kanssa",
      seller: "Terpan tila",
    },
    {
      name: "herne 1 litra",
      amount: 2,
      soldlimit: 15,
      price: 23,
      image: "http://www.hankkija.fi/Liitetiedostot/Pics/herneetw900.jpg",
      type: "laatikko",
      text: "Sopii hyvin syötäväksi sellaisenaan. Makeita",
      seller: "Terpan tila",
    },
    {
      name: "naudan sisäfile",
      amount: 1,
      soldlimit: 4,
      price: 66,
      image: "https://www.wotkins.fi/wp-content/uploads/2016/05/naudan_sisafilee.jpg",
      type: "kilo",
      text: "kotimaista naudansisäfilettä suoraan pellolta pöytään",
      seller: "Terpan tila",
    },
  ]
  const [counter, setCounter] = useState(0)

  const RenderProducts = (product, index) => {
    return (
      <Card key={index}>
        <Row>
          <Col>
            <Card.Img src={product.image} alt="Generic placeholder" rouded />
          </Col>
          <Col xs={8} className="text-left">
            <Card.Title>{product.seller}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <h8>{product.name}</h8>
            </Card.Subtitle>
            <Card.Subtitle className="text-muted">{product.text}</Card.Subtitle>
          </Col>
        </Row>
        <Row>
          <Col xs={1}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-dash-circle"
              viewBox="0 0 16 16"
              onClick={() => setCounter(counter - 1)}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          </Col>
          <Col xs={1}>
            <h5>{counter}</h5>
          </Col>
          <Col xs={1} md={2}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
              onClick={() => setCounter(counter + 1)}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </Col>
          <Col>
            <h5>{product.type}</h5>
          </Col>
          <Col>
            <h5>{product.amount * product.price}€</h5>
          </Col>
        </Row>
      </Card>
    )
  }

  return <div>{tuotteet.map(RenderProducts)}</div>
}

export default OrdersBuyersProducts
