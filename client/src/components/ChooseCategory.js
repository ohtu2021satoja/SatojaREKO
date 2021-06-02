import React from "react"
import Dropdown from "react-bootstrap/Dropdown"

const ChooseCategory = ({ category, setFieldValue }) => {
  console.log(category)
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {category}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setFieldValue("category" ,"Vihannekset")}>
            {" "}
            Vihannekset{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFieldValue("category", "Liha & kala")}>
            {" "}
            Liha & kala{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFieldValue("category" ,"Munat")}> Munat </Dropdown.Item>
          <Dropdown.Item onClick={() => setFieldValue("category" ,"Hedelmät & marjat")}>
            {" "}
            Hedelmät & marjat{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFieldValue("category" ,"Maitotuotteet")}>
            {" "}
            Maitotuotteet{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFieldValue("category" ,"Leivät & leivonta")}>
            {" "}
            Leivät & leivonta{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFieldValue("category" ,"Yrtit & mausteet")}>
            {" "}
            Yrtit & mausteet{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFieldValue("category" ,"Ruokaa")}> Ruokaa </Dropdown.Item>
          <Dropdown.Item onClick={() => setFieldValue("category" ,"Juomat")}> Juomat </Dropdown.Item>
          <Dropdown.Item onClick={() => setFieldValue("category" ,"Muut")}> Muut </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default ChooseCategory
