import React from "react"
import Form from "react-bootstrap/Form"
import Alv from "./Alv"
import Price from "./Price"
import { useSelector } from "react-redux"

const PackagePrices = ({ packageQuantity, setPackageQuantity }) => {
  const price = useSelector((state) => state.price)
  return (
    <div>
      <Alv />
      Hinta (sis alv)
      <Price price={price} />
      Varastoarvo
      <Form.Control
        value={packageQuantity}
        onChange={(event) => setPackageQuantity(parseInt(event.target.value))}
        type="number"
        placeholder="0"
      />
    </div>
  )
}

export default PackagePrices
