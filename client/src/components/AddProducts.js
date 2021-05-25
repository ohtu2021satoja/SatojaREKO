import React, { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { useSelector, useDispatch } from "react-redux"
import { changePrice } from "../reducers/priceReducer"

const Alv = () => {
  const [alv, setAlv] = useState("24%")
  return(
    <div>
    Valitse alv.%
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      {alv}
    </Dropdown.Toggle>

    <Dropdown.Menu>
    <Dropdown.Item onClick={() => setAlv("Ei alv.")}>
        Ei alv.
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setAlv("0%")}>
        0%
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setAlv("0%")}>
        14%
      </Dropdown.Item>
      <Dropdown.Item onClick={() => setAlv("0%")}>
        24%
      </Dropdown.Item>
    </Dropdown.Menu>
    </Dropdown>
    </div>
  )
}

const Price = ({price, setPrice}) => {
  const dispatch = useDispatch() 
  const handlePrice = (newPrice) => {
    const lastchar = newPrice.slice(-1)
    if(lastchar !=="€"){
      newPrice = newPrice+"€"
    }
    setPrice(newPrice)
    dispatch(changePrice(price))
  }
  return(
    <Form.Control
    value={price}
    onChange={(event) => setPrice(event.target.value)}
    type="text"
    placeholder="00,00€"
    onKeyPress={event => {
      if (event.key === 'Enter') {
        handlePrice(event.target.value)
      }
      
    }}
  />
  )

  
}
const PackagePrices = () => {
  const [storageQuantity, setStorageQuantity] = useState(0)
  const [price, setPrice] = useState("00,00€")
  return(
    <div>
    <Alv/>
    Hinta (sis alv)
    <Price price={price} setPrice={setPrice}/>
    Varastoarvo
    <Form.Control
            value={storageQuantity}
            onChange={(event) => setStorageQuantity(parseInt(event.target.value))}
            type="number"
            placeholder="0"
          />
  </div>
  )
}

const ProductRow = () => {
  const [unitSize, setUnitSize ] = useState("0,0")
  const price = useSelector(state => state.price)
  const priceFloat = parseFloat(price.substring(0,price.length-1).replace(",","."))
  const unitSizeFloat = parseFloat(unitSize.replace(",", "."))
  return(
    <div>
          <Form.Control
            value={unitSize}
            onChange={(event) => setUnitSize(event.target.value)}
            type="text"
            placeholder="0,0"
          />
      {unitSizeFloat} {unitSizeFloat*priceFloat}
    </div>
  )
}

const UnitPrices = () => {
  const [price, setPrice] = useState("00,00€")
  console.log(price)
  const [productrows, setProductRows] = useState([<ProductRow key ={1} unitPrice={price}/>])
  return(
    <div>
    <Alv/>
    Aseta kilohinta (sis alv)
    <Price price={price} setPrice={setPrice}/>
    <Button onClick={() => setProductRows(productrows.concat(<ProductRow key={productrows.length+1} unitPrice={price}/>))}>Lisää tuoterivi</Button>
    {productrows}
  </div>
  )
}

const AddProducts = () => {
  const [organic, setOrganic] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [isPackage, setIsPackage] = useState(true)
  const prices = isPackage ? <PackagePrices/>  : <UnitPrices/>
  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(category, organic)

    setCategory("")
  }
  return (
    <div>
        <Form.Label as="h3" className="my-4 text-center">
          Uusi ilmoitus
        </Form.Label>
        <Form onSubmit={handleSubmit}>
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
        <Form.Group>
          <Form.Control
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Otsikko"
          />
          <Form.Control
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            type="text"
            placeholder="Tuotekuvaus"
          />
          <Button onClick={() => setOrganic(!organic)} variant={organic ? "success" : "danger"}> Tuote on luomua</Button>
          <br/>
          <Button onClick={() => setIsPackage(!isPackage)}> {isPackage ? "Kiinteä hinta" : "Eri kokoja & hintoja" } </Button>
          {prices}
        </Form.Group>
        <Form.Row className="mb-3">
          <Col>
            <Button style={{ width: "100%" }} variant="success" size="lg" type="submit">
              Esikatselu
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  )
}



export default AddProducts
