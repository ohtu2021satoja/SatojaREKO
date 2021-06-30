import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Events from "./Events"
import { useSelector } from "react-redux"
import productService from "../services/products"
import Image from "react-bootstrap/Image"

const PreviewSize = ({ size }) => {
  return (
    <Card
      as={Col}
      xs={12}
      sm={{ span: 10, offset: 1 }}
      md={{ span: 8, offset: 2 }}
      lg={{ span: 6, offset: 3 }}
      xl={{ span: 4, offset: 4 }}
      className="mb-2 py-2"
    >
      <Card.Text className="mb-0">Koko: {size.unit}</Card.Text>
      Varastoarvo {size.quantity}
      <Card.Text>Hinta: {size.price}€</Card.Text>
    </Card>
  )
}

const PublishedHeader = ({ Reset }) => {
  return (
    <Row className="bg-light-green show-topmost" style={{ marginTop: -25 }}>
      <Col sm={{ span: 10, offset: 1 }} className="mt-3 text-center">
        <h2>Julkaistu</h2>
        <h4>Kerro kavereille!</h4>
        <p>
          Ilmoitusta ja noutotilaisuuksia voi muokata <b>Tuotteet</b> sivulta.
        </p>
        <Button onClick={() => Reset()} size="lg" variant="success" className="w-100">
          Luo uusi ilmoitus
        </Button>
      </Col>
    </Row>
  )
}

const PreviewSizes = ({ sizes }) => {
  const displaySizes = sizes.map((size) => <PreviewSize key={size.unit} size={size} />)
  return (
    <div>
      <h4>Koot</h4>
      {displaySizes}
    </div>
  )
}

const Preview = ({
  setPreview,
  imageID,
  organic,
  title,
  description,
  packageQuantity,
  eventChoices,
  events,
  category,
  productType,
  deleteBeforeEvent,
  Reset,
}) => {
  const [published, setPublished] = useState(false)
  const user = useSelector((state) => state.authedUser)
  console.log(user)
  const alv = useSelector((state) => state.alv)
  const vat = parseInt(alv.slice(0, -1))
  console.log(vat)
  const previewEvents = events.filter((event) => {
    return eventChoices.includes(event.id)
  })
  const productSizes = useSelector((state) => state.productSizes)
  const isPackage = productSizes.length === 1
  const price = useSelector((state) => state.price)

  const batch_quantity = isPackage
    ? productSizes[0].quantity
    : productSizes.reduce((a, b) => a + b.quantity, 0)

  const priceFloat = parseFloat(price.substring(0, price.length).replace(",", "."))
  const priceInt = parseInt(100 * priceFloat)

  const sizes = isPackage
    ? [
        {
          price: priceFloat,
          quantity: productSizes[0].quantity,
          unit: productSizes[0].size.replace(",", "."),
        },
      ]
    : productSizes.map((unitSize) => {
        const unitSizeFloat = parseFloat(unitSize.size.replace(",", "."))
        console.log(unitSizeFloat)
        console.log(priceFloat)
        const resFloat = priceFloat * unitSizeFloat
        return {
          price: resFloat,
          quantity: unitSize.quantity,
          unit: unitSizeFloat,
        }
      })

  const parseType = (productType) => {
    if (productType === "Kg") {
      return "kg"
    }
    if (productType === "Kuutio") {
      return "cube"
    }
    if (productType === "Litra") {
      return "l"
    }
    if (productType === "Motti") {
      return "motti"
    }
    if (productType === "Gramma") {
      return "gm"
    }
  }
  const PublishProduct = async () => {
    const type = parseType(productType)
    const product = {
      name: title,
      organic,
      sellers_id: user.id,
      type,
      batch_quantity,
      description,
      imageURL: imageID,
      category,
      deleteBeforeEvent,
      unit_price: priceInt,
      vat,
    }
    await productService.addProduct({ product, eventChoices, sizes })
    setPublished(true)
  }
  return (
    <Row className="h-100 bg-light-yellow flex-column">
      <Col xs={12}>
        <Nav className="mt-2 py-2 flex-nowrap align-items-center">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="./add"
              aria-label="Palaa lisää tuote sivulle"
              onClick={() => setPreview(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left-square-fill back-link"
                viewBox="0 0 16 16"
              >
                <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
              </svg>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="flex-grow-1 pt-2 text-center" style={{ paddingRight: 52 }}>
            <h2>Esikatselu</h2>
          </Nav.Item>
        </Nav>
      </Col>
      <Col xs={12} className="pt-2 mb-2 text-center">
        {imageID ? (
          <Image
            src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_600/${imageID}`}
            alt="Tuotekuva"
            fluid
          />
        ) : (
          <p>Ei kuvaa</p>
        )}
      </Col>
      <Col xs={{ span: 10, offset: 1 }} className="mb-4 text-center">
        <Button variant={organic ? "success" : "danger"} className="w-75">
          {organic ? "Luomua" : "Ei luomua"}
        </Button>
      </Col>
      <Col xs={12} className="mb-4 text-center">
        <h3>{title}</h3>
        <p>{description}</p>
        <h4>
          {price}/{parseType(productType)}
        </h4>
        <p className="mb-1">Alv: {alv}</p>
        <p>Varastoarvo {batch_quantity}</p>
        {isPackage ? (
          <p>Hinta: {priceFloat * parseFloat(productSizes[0].size.replace(",", "."))}€</p>
        ) : null}
        {isPackage ? null : <PreviewSizes sizes={sizes} />}
      </Col>
      <Col xs={12} className="text-center">
        <h4>Noutotapahtumat:</h4>
        <Events events={previewEvents} isChoice={false} />
        {published ? null : (
          <>
            <p className="text-muted">
              Tilaus sulkeutuu {deleteBeforeEvent} tuntia ennen noutotilaisuuden alkua.
            </p>
            <Button
              variant="success"
              size="lg"
              onClick={PublishProduct}
              className="w-100 mb-3"
            >
              Julkaise
            </Button>
          </>
        )}
        {published ? <PublishedHeader Reset={Reset} /> : null}
      </Col>
    </Row>
  )
}

export default Preview
