import React from "react"
import Alv from "./Alv"
import Price from "./Price"
import Button from "react-bootstrap/Button"
import ProductRow from "./ProductRow"
import { useDispatch, useSelector } from "react-redux"
import { addQuantity, removeQuantity } from "../reducers/productSizesReducer"

const UnitPrices = ({ setFieldValue, errors, touched, sizes, quantities }) => {
  const dispatch = useDispatch()
  const productSizes = useSelector((state) => state.productSizes)
  const productType = useSelector((state) => state.currentProduct.product.type)
  const productrows = []
  for (const i in productSizes) {
    productrows.push(
      <ProductRow
        key={i}
        index={i}
        sizes={sizes}
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
        quantities={quantities}
        productType={productType}
      />
    )
  }
  const addProductRow = () => {
    const newsize = sizes.concat(0)
    const newquantities = quantities.concat(0)
    setFieldValue("sizes", newsize)
    setFieldValue("quantities", newquantities)
    dispatch(addQuantity())
  }

  const deleteProductRow = () => {
    if (sizes.length > 1 && quantities.length > 1) {
      const newsize = sizes
      newsize.pop()
      const newquantities = quantities
      newquantities.pop()
      setFieldValue("sizes", newsize)
      setFieldValue("quantities", newquantities)
      dispatch(removeQuantity())
    }
  }
  const parseType = (productType) => {
    if (productType === "Kg") {
      return "Aseta kilohinta (sis alv)"
    }
    if (productType === "Kuutio") {
      return "Aseta kuutiohinta (sis alv)"
    }
    if (productType === "Litra") {
      return "Aseta litrahinta (sis alv)"
    }
    if (productType === "Motti") {
      return "Aseta mottihinta (sis alv)"
    }
    if (productType === "Gramma") {
      return "Aseta grammahinta (sis alv)"
    }
  }
  return (
    <div>
      <Alv />
      {parseType(productType)}
      <Price setFieldValue={setFieldValue} errors={errors} touched={touched} />
      {productrows}
      <Button onClick={deleteProductRow} variant="danger">
        Poista tuoterivi
      </Button>
      <Button onClick={addProductRow}>Lisää tuoterivi</Button>
    </div>
  )
}

export default UnitPrices
