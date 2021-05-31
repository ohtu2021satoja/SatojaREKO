import React, { useState } from "react"
import Alv from "./Alv"
import Price from "./Price"
import Button from "react-bootstrap/Button"
import ProductRow from "./ProductRow"
import { useDispatch, useSelector } from "react-redux"
import { addQuantity } from "../reducers/productSizesReducer"

const UnitPrices = () => {
  const dispatch = useDispatch()
  const price = useSelector((state) => state.price)
  const productSizes = useSelector((state) => state.productSizes)
  const productrows = []
  for (const i in productSizes) {
    productrows.push(<ProductRow key={i} index={i} />)
  }
  const addProductRow = () => {
    dispatch(addQuantity())
  }
  return (
    <div>
      <Alv />
      Aseta kilohinta (sis alv)
      <Price price={price} />
      <Button onClick={addProductRow}>Lisää tuoterivi</Button>
      {productrows}
    </div>
  )
}

export default UnitPrices
