import React from "react"
import Form from "react-bootstrap/Form"
import { changePrice } from "../reducers/priceReducer"
import { useSelector, useDispatch } from "react-redux"

const Price = () => {
  const price = useSelector((state) => state.price)
  const dispatch = useDispatch()
  const handlePrice = (newPrice) => {
    const lastchar = newPrice.slice(-1)
    if (lastchar !== "€") {
      newPrice = newPrice + "€"
    }
    dispatch(changePrice(newPrice))
  }
  return (
    <Form.Control
      value={price}
      onChange={(event) => dispatch(changePrice(event.target.value))}
      type="text"
      onBlur={() => handlePrice(price)}
      placeholder="00,00€"
    />
  )
}

export default Price
