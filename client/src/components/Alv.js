import React from "react"
import Form from "react-bootstrap/Form"
import Dropdown from "react-bootstrap/Dropdown"
import { useSelector, useDispatch } from "react-redux"
import { setAlv } from "../reducers/alvReducer.js"

const Alv = () => {
  const dispatch = useDispatch()
  const alv = useSelector((state) => state.alv)
  return (
    <Form.Group className="mb-3 text-center">
      <Form.Label className="mb-0">Valitse alv. %</Form.Label>
      <Dropdown className="w-100">
        <Dropdown.Toggle
          variant="outline-secondary"
          id="dropdown-basic"
          size="lg"
          className="w-100 bg-white"
        >
          {alv}
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100">
          <Dropdown.Item onClick={() => dispatch(setAlv("Ei alv."))}>
            Ei alv.
          </Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(setAlv("0%"))}>0%</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(setAlv("14%"))}>14%</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(setAlv("24%"))}>24%</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Form.Group>
  )
}

export default Alv
