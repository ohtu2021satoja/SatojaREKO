import React, { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown"
import { useSelector, useDispatch } from "react-redux"
import { setAlv } from "../reducers/alvReducer.js"

const Alv = () => {
  const dispatch = useDispatch()
  const alv = useSelector((state) => state.alv)
  return (
    <div>
      Valitse alv.%
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {alv}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => dispatch(setAlv("Ei alv."))}>Ei alv.</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(setAlv("0%"))}>0%</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(setAlv("14%"))}>14%</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(setAlv("24%"))}>24%</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Alv

