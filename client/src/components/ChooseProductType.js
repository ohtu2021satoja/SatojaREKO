import React from "react"
import Form from "react-bootstrap/Form"
import Dropdown from "react-bootstrap/Dropdown"
import { useSelector, useDispatch } from "react-redux"
import { setProductType } from "../reducers/currentProduct"

const ChooseProductType = ({ setFieldValue }) => {
  const productType = useSelector((state) => state.currentProduct.product.type)
  const dispatch = useDispatch()
  return (
    <Form.Group className="pt-4 text-center">
      <Form.Label className="mb-0">Valitse yksikkö</Form.Label>
      <Dropdown className="w-100">
        <Dropdown.Toggle
          variant="outline-secondary"
          id="dropdown-basic"
          size="lg"
          className="w-100 bg-white"
        >
          {productType}
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100">
          <Dropdown.Item
            onClick={() => {
              setFieldValue("productType", "Kappale")
              dispatch(setProductType("Kappale"))
            }}
          >
            {" "}
            Kpl{" "}
          </Dropdown.Item>
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
    </Form.Group>
  )
}

export default ChooseProductType
