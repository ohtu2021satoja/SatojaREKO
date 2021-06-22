import React from "react"
import Dropdown from "react-bootstrap/Dropdown"
import { useSelector, useDispatch } from "react-redux"
import { setProductType } from "../reducers/currentProduct"

const ChooseProductType = ({ setFieldValue }) => {
  const productType = useSelector((state) => state.currentProduct.product.type)
  const dispatch = useDispatch()
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {productType}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            setFieldValue("productType", "Kg")
            dispatch(setProductType("Kg"))
          }}
        >
          {" "}
          Kg{" "}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setFieldValue("productType", "Litra")
            dispatch(setProductType("Litra"))
          }}
        >
          {" "}
          Litra{" "}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setFieldValue("productType", "Gramma")
            dispatch(setProductType("Gramma"))
          }}
        >
          {" "}
          Gramma{" "}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setFieldValue("productType", "Motti")
            dispatch(setProductType("Motti"))
          }}
        >
          {" "}
          Motti{" "}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setFieldValue("productType", "Kuutio")
            dispatch(setProductType("Kuutio"))
          }}
        >
          {" "}
          Kuutio{" "}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ChooseProductType
