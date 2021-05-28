import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Form from "react-bootstrap/Form"
import { changeQuantity, changeSize } from "../reducers/productSizesReducer"

const ProductRow = ({ index }) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.productSizes)[index]
  const storageQuantity = state.quantity
  const unitSize = state.size
  const handleQuantityChange = (quantity) => {
    dispatch(changeQuantity(quantity, index))
  }
  const price = useSelector((state) => state.price)
  const priceFloat = parseFloat(price.substring(0, price.length).replace(",", "."))
  const unitSizeFloat = parseFloat(unitSize.replace(",", "."))
  console.log(priceFloat, unitSizeFloat)
  return (
    <div>
      <Form.Control
        value={unitSize}
        onChange={(event) => dispatch(changeSize(event.target.value, index))}
        type="text"
        placeholder="0,0"
      />
      <Form.Control
        value={storageQuantity}
        onChange={(event) => handleQuantityChange(parseInt(event.target.value))}
        type="number"
        placeholder="0"
      />
      <p>Hinta: {priceFloat * unitSizeFloat}€</p>
    </div>
  )
}

export default ProductRow
