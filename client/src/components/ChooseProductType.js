import React from "react"
import Dropdown from "react-bootstrap/Dropdown"

const ChooseProductType = ({ productType, setFieldValue }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {productType}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setFieldValue("productType", "Kg")}> Kg </Dropdown.Item>
        <Dropdown.Item onClick={() => setFieldValue("productType", "Litra")}> Litra </Dropdown.Item>
        <Dropdown.Item onClick={() => setFieldValue("productType", "Gramma")}> Gramma </Dropdown.Item>
        <Dropdown.Item onClick={() => setFieldValue("productType", "Motti")}> Motti </Dropdown.Item>
        <Dropdown.Item onClick={() => setFieldValue("productType", "Kuutio")}> Kuutio </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ChooseProductType
