import React from "react"
import Dropdown from "react-bootstrap/Dropdown"

const ChooseProductType = ({ productType, setProductType }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {productType}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setProductType("Kg")}> Kg </Dropdown.Item>
        <Dropdown.Item onClick={() => setProductType("Litra")}> Litra </Dropdown.Item>
        <Dropdown.Item onClick={() => setProductType("Gramma")}> Gramma </Dropdown.Item>
        <Dropdown.Item onClick={() => setProductType("Motti")}> Motti </Dropdown.Item>
        <Dropdown.Item onClick={() => setProductType("Kuutio")}> Kuutio </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default ChooseProductType
