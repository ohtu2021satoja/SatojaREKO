import React from "react"
import Form from "react-bootstrap/Form"
import Alv from "./Alv"
import Price from "./Price"
import { useDispatch, useSelector } from "react-redux"
import { changeQuantity, changeSize } from "../reducers/productSizesReducer"

const PackagePrices = ({ packageQuantity, setPackageQuantity }) => {
  const dispatch = useDispatch()
  const price = useSelector((state) => state.price)
  const qt = useSelector((state) => state.productSizes[0])
  return (
    <div>
      <Alv />
      Hinta (sis alv)
      <Price price={price} />
      Varastoarvo
      <Form.Control
        value={qt.quantity}
        onChange={(event) => dispatch(changeQuantity(parseInt(event.target.value),0))}
        type="number"
        placeholder="0"
      />
      <Form.Control
        value={qt.size}
        onChange={(event) => dispatch(changeSize(event.target.value, 0))}
        type="text"
      />
    </div>
  )
}


export default PackagePrices
