import React, { useState } from "react"
import Alv from "./Alv"
import Price from "./Price"
import Button from "react-bootstrap/Button"
import ProductRow from "./ProductRow"
import { useDispatch, useSelector } from "react-redux"
import { addQuantity } from "../reducers/productSizesReducer"

const UnitPrices = ({ setFieldValue, errors, touched, sizes, quantities }) => {
  const dispatch = useDispatch()
  const price = useSelector((state) => state.price)
  const productSizes = useSelector((state) => state.productSizes)
  const productrows = []
  for (const i in productSizes) {
    productrows.push(<ProductRow key={i} index={i} sizes={sizes} errors={errors} touched={touched} setFieldValue={setFieldValue} quantities={quantities}/>)
  }
  const addProductRow = () => {
    const newsize = sizes.concat(0)
    const newquantities = quantities.concat(0)
    setFieldValue("sizes",newsize)
    setFieldValue("quantities", newquantities)
    dispatch(addQuantity())
  }
  return (
    <div>
      <Alv />
      Aseta kilohinta (sis alv)
      <Price setFieldValue = {setFieldValue} errors={errors} touched={touched}/>
      {productrows}
      <Button onClick={addProductRow}>Lisää tuoterivi</Button>
    </div>
  )
}

export default UnitPrices
