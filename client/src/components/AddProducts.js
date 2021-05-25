import React, { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown"

const AddProducts = () => {
  const [category, setCategory] = useState("")
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setCategory("Vihannekset")}>
            {" "}
            Vihannekset{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Liha & kala")}>
            {" "}
            Liha & kala{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Munat")}> Munat </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Hedelmät & marjat")}>
            {" "}
            Hedelmät & marjat{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Maitotuotteet")}>
            {" "}
            Maitotuotteet{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Leivät & leivonta")}>
            {" "}
            Leivät & leivonta{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Yrtit & mausteet")}>
            {" "}
            Yrtit & mausteet{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Ruokaa")}> Ruokaa </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Juomat")}> Juomat </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("Muut")}> Muut </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {category}
    </div>
  )
}

export default AddProducts
