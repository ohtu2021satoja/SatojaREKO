import React from "react"
import Form from "react-bootstrap/Form"
import { changePrice } from "../reducers/priceReducer"
import { useSelector, useDispatch } from "react-redux"
import { Placeholder } from "cloudinary-react"

const Price = ({ setFieldValue, errors, touched }) => {
  const price = useSelector((state) => state.price)
  console.log("PRICE", price)
  const dispatch = useDispatch()
  const handlePrice = (newPrice) => {
    const lastchar = newPrice.slice(-1)
    if (lastchar !== "€") {
      newPrice = newPrice + "€"
    }
    dispatch(changePrice(newPrice))
  }
  return (
    <div>
      <Form.Control
        value={price}
        onChange={(event) => {
          setFieldValue("price", event.target.value)
          dispatch(changePrice(event.target.value))
        }}
        placeholder="00,00€"
        type="text"
        id="unit_price"
        onBlur={() => handlePrice(price)}
      />
      {touched.price && errors.price ? <div>{errors.price}</div> : null}
    </div>
  )
}

export default Price
