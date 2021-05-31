import React, { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown"

const Alv = () => {
  const [alv, setAlv] = useState("24%")
  return (
    <div>
      Valitse alv.%
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {alv}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setAlv("Ei alv.")}>Ei alv.</Dropdown.Item>
          <Dropdown.Item onClick={() => setAlv("0%")}>0%</Dropdown.Item>
          <Dropdown.Item onClick={() => setAlv("0%")}>14%</Dropdown.Item>
          <Dropdown.Item onClick={() => setAlv("0%")}>24%</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Alv
