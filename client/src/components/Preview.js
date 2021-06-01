import React from "react"
import { Image } from "cloudinary-react"
import Button from "react-bootstrap/Button"
import Events from "./Events"
import { useSelector } from "react-redux"
import productService from "../services/products"

const PreviewSize = ({ size }) => {
  return (
    <div>
      <p>Koko: {size.unit} </p>
      <p>Hinta: {size.price}</p>
      <p>Määrä: {size.quantity}</p>
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
  deleteBeforeEvent
}) => {
  
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
    ? [{ price: priceFloat, quantity: packageQuantity, unit: productSizes[0].size }]
    : productSizes.map((unitSize) => {
        const unitSizeFloat = parseFloat(unitSize.size.replace(",", "."))
        console.log(unitSizeFloat)
        console.log(priceFloat)
        const resFloat = priceFloat * unitSizeFloat
        return {
          price: resFloat,
          quantity: unitSize.quantity,
          unit: unitSize.size,
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
  const PublishProduct = () => {
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
      priceInt
    }
    productService.addProduct({ product, eventChoices, sizes })
  }
  return (
    <div>
      <h2>Esikatselu</h2>
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
      {isPackage ? (
        <h4>{price}/kpl</h4>
      ) : (
        <h4>
          {price}/{parseType(productType)}
        </h4>
      )}
      <p>Varastoarvo {batch_quantity}</p>
      {isPackage ? <p>Hinta: {priceFloat*parseFloat(productSizes[0].size.replace(",", "."))}€</p> : null }
      {isPackage ? null : <PreviewSizes sizes={sizes} />}
      <Events events={previewEvents} isChoice={false} />
      <Button
        style={{ width: "100%" }}
        variant="success"
        size="lg"
        onClick={PublishProduct}
      >
        Julkaise
      </Button>
    </div>
  )
}

export default Preview
