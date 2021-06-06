import React, {useState} from "react"
import { Image } from "cloudinary-react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Events from "./Events"
import { useSelector } from "react-redux"
import productService from "../services/products"

const PreviewSize = ({ size }) => {
  return (
    <Card
    as={Col}
    xs={12}
    sm={{ span: 10, offset: 1 }}
    md={{ span: 8, offset: 2 }}
    lg={{ span: 6, offset: 3 }}
    xl={{ span: 4, offset: 4 }}
    >

      <div>
        Koko: {size.unit}
      </div>
        Varastoarvo {size.quantity}
      <div>
        Hinta: {size.price}€
      </div>
      <div>
      </div>
    </Card>
  )
}

const PublishedHeader = ({Reset}) => {
  return(
    <div style={{backgroundColor: "green"}}>
      <h2>Julkaistu</h2>
      <h3>Kerro kavereille</h3>
      <h3 onClick={() => Reset()}>Luo uusi ilmoitus</h3>
    </div>
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
  Reset
}) => {
  const [published, setPublished] = useState(false)
  const alv = useSelector((state) => state.alv)
  const vat = parseInt(alv.slice(0,-1))
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
  const priceInt = parseInt(100*priceFloat)

  const sizes = isPackage
    ? [{ price: priceFloat, quantity: productSizes[0].quantity, unit: productSizes[0].size.replace(",", ".") }]
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
      sellers_id: 1,
      type,
      batch_quantity,
      description,
      imageURL: imageID,
      category,
      deleteBeforeEvent,
      unit_price: priceInt,
      vat
    }
    await productService.addProduct({ product, eventChoices, sizes })
    setPublished(true)
  }
  return (
    <div>
      {published ? <PublishedHeader Reset={Reset}/> : <h2>Esikatselu</h2> }
      <Button variant="primary" onClick={() => setPreview(false)}>
        Back
      </Button>
      <br />
      {imageID ? <Image cloudName="dpk81nwou" publicId={imageID} /> : "Ei kuvaa"}
      <br />
      <Button variant={organic ? "success" : "danger"}>
        {organic ? "Luomua" : "Ei luomua"}
      </Button>
      <h3>{title}</h3>
      <p>{description}</p>
      <h4>{price}/{parseType(productType)}</h4>
      <p>Alv: {alv}</p>
      <p>Varastoarvo {batch_quantity}</p>
      {isPackage ? <p>Hinta: {priceFloat*parseFloat(productSizes[0].size.replace(",", "."))}€</p> : null }
      {isPackage ? null : <PreviewSizes sizes={sizes} />}
      <h4>Noutotapahtumat</h4>
      <Events events={previewEvents} isChoice={false} />
      <p>Tilaus sulkeutuu {deleteBeforeEvent} tuntia ennen noutotilaisuuden alkua.</p>
      {published ? null :       
      <Button
        style={{ width: "100%" }}
        variant="success"
        size="lg"
        onClick={PublishProduct}
      >
        Julkaise
      </Button>}
      { published ? <p>Ilmoitusta ja noutotilaisuuksia voi muokata <b>Tuotteet</b> sivulta.</p> :null }
    </div>
  )
}

export default Preview
