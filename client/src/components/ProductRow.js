import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Form from "react-bootstrap/Form"
import { changeQuantity, changeSize } from "../reducers/productSizesReducer"

const ProductRow = ({ index, errors, touched, sizes, setFieldValue, quantities }) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.productSizes)[index]
  const storageQuantity = state.quantity
  const unitSize = state.size
  const handleQuantityChange = (quantity) => {
    const newquantities = quantities
    newquantities[index] = quantity
    setFieldValue("quantities", newquantities)
    dispatch(changeQuantity(quantity, index))
  }
  const price = useSelector((state) => state.price)
  const priceFloat = parseFloat(price.substring(0, price.length).replace(",", "."))
  const unitSizeFloat = parseFloat(unitSize.replace(",", "."))
  return (
    <div>
      Pakettikoko
      <Form.Control
        value={unitSize}
        onChange={(event) => {
          const newsizes = sizes
          newsizes[index] = parseFloat(event.target.value.replace(",","."))
          setFieldValue("sizes", newsizes)
          dispatch(changeSize(event.target.value, index))
        }}
        type="text"
        placeholder="0,0"
      />
      {unitSizeFloat===0.0 && errors.sizes && touched.sizes ? (<div>{errors.sizes}</div>): null }
      Pakettimäärä
      <Form.Control
        value={storageQuantity}
        onChange={(event) => handleQuantityChange(parseInt(event.target.value))}
        type="number"
        placeholder="0"
      />
      {storageQuantity<1 && errors.quantities && touched.quantities ? (<div>{errors.quantities}</div>): null }
      <p>Hinta: {priceFloat * unitSizeFloat}€</p>
    </div>
  )
}

export default ProductRow
