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
    <Form.Group className="mb-3 text-center">
      <Form.Label className="mb-0">Hinta (sis. alv)</Form.Label>
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
        placeholder="00,00€"
        size="lg"
        className="w-100"
      />
      {touched.price && errors.price ? <div>{errors.price}</div> : null}
    </Form.Group>
  )
}

export default Price
