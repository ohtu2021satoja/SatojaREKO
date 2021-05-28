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
  console.log(price)
  const [productrows, setProductRows] = useState([<ProductRow key={0} index={0} />])
  const addProductRow = () => {
    dispatch(addQuantity())
    setProductRows(
      productrows.concat(
        <ProductRow key={productrows.length} index={productrows.length} />
      )
    )
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
