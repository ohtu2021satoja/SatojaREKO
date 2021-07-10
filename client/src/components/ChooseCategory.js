import React from "react"
import Dropdown from "react-bootstrap/Dropdown"

const ChooseCategory = ({ category, setFieldValue }) => (
  <Dropdown className="w-100 mb-2">
    <Dropdown.Toggle
      variant="outline-secondary"
      size="lg"
      id="dropdown-basic"
      className="w-100 bg-white"
    >
      {category}
    </Dropdown.Toggle>

    <Dropdown.Menu className="w-100">
      <Dropdown.Item onClick={() => setFieldValue("category", "Vihannekset")}>
        {" "}
        Vihannekset{" "}
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFieldValue("category", "Liha & kala")}>
        {" "}
        Liha & kala{" "}
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFieldValue("category", "Munat")}>
        {" "}
        Munat{" "}
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFieldValue("category", "Hedelmät & marjat")}>
        {" "}
        Hedelmät & marjat{" "}
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFieldValue("category", "Maitotuotteet")}>
        {" "}
        Maitotuotteet{" "}
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFieldValue("category", "Leivät & leivonta")}>
        {" "}
        Leivät & leivonta{" "}
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFieldValue("category", "Yrtit & mausteet")}>
        {" "}
        Yrtit & mausteet{" "}
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFieldValue("category", "Ruokaa")}>
        {" "}
        Ruokaa{" "}
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFieldValue("category", "Juomat")}>
        {" "}
        Juomat{" "}
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setFieldValue("category", "Muut")}>
        {" "}
        Muut{" "}
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default ChooseCategory
