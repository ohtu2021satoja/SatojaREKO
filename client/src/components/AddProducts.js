import React, { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { Checkbox } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux"
import { changePrice } from "../reducers/priceReducer"
import { changeQuantity, addQuantity } from "../reducers/quantitiesReducer"
import { Image } from "cloudinary-react"
import axios from "axios"

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
const PackagePrices = ({packageQuantity, setPackageQuantity}) => {
  const [price, setPrice] = useState("00,00€")
  return(
    <div>
    <Alv/>
    Hinta (sis alv)
    <Price price={price} setPrice={setPrice}/>
    Varastoarvo
    <Form.Control
            value={packageQuantity}
            onChange={(event) => setPackageQuantity(parseInt(event.target.value))}
            type="number"
            placeholder="0"
          />
  </div>
  )
}

const ProductRow = ({index}) => {
  const dispatch = useDispatch()
  const [unitSize, setUnitSize ] = useState("0,0")
  const [storageQuantity, setStorageQuantity] = useState(0)
  const handleQuantityChange = (quantity) => {
    setStorageQuantity(quantity)
    dispatch(changeQuantity(quantity, index))
  }
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
          <Form.Control
            value={storageQuantity}
            onChange={(event) => handleQuantityChange(parseInt(event.target.value))}
            type="number"
            placeholder="0"
          />
      {index} {unitSizeFloat*priceFloat} {storageQuantity}
    </div> 
  )
}

const UnitPrices = () => {
  const dispatch = useDispatch()
  const [price, setPrice] = useState("00,00€")
  console.log(price)
  const [productrows, setProductRows] = useState([<ProductRow key ={0} index={0}/>])
  const addProductRow = () => {
    dispatch(addQuantity())
    setProductRows(productrows.concat(<ProductRow key={productrows.length} index={productrows.length}/>))
  }
  return(
    <div>
    <Alv/>
    Aseta kilohinta (sis alv)
    <Price price={price} setPrice={setPrice}/>
    <Button onClick={addProductRow}>Lisää tuoterivi</Button>
    {productrows}
  </div>
  )
}

const AddProducts = () => {
  const price = useSelector(state => state.price)
  const [organic, setOrganic] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Valitse kategoria")
  const [description, setDescription] = useState("")
  const [isPackage, setIsPackage] = useState(true)
  const [packageQuantity, setPackageQuantity ] = useState(0)
  const [preview, setPreview] = useState(false)
  const [imageID, setImageID ] = useState(null)
  const prices = isPackage ? <PackagePrices packageQuantity={packageQuantity} setPackageQuantity={setPackageQuantity}/>  : <UnitPrices/>
  const handleSubmit = (event) => {
    event.preventDefault()
    setPreview(true)
  }
  const quantities = useSelector(state => state.quantities)
  console.log(quantities)
  const handleImage = async (image) => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "ml_default")
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dpk81nwou/image/upload",
      formData
    )
    setImageID(response.data.public_id)
  }
  if(preview){
    return(
      <div>
        <h2>Esikatselu</h2>
        <Button variant="primary" onClick={() => setPreview(false)}>
          Back
        </Button>
        <br/>
        {imageID ? <Image cloudName="dpk81nwou"publicId={imageID}/> : "Ei kuvaa" }
        <br/>
        <Button variant={organic ? "success" : "danger"}>{organic ? "Luomua" : "Ei luomua"}</Button>
        <h3>{title}</h3>
        <p>{description}</p>
        {isPackage ? <h4>{price}/kpl</h4> : null}
        {isPackage ? <p>Varastoarvo: {packageQuantity}</p> : null}
        <Button style={{ width: "100%" }} variant="success" size="lg" onClick={() =>setPreview(true)}>
              Julkaise
        </Button>
      </div>
    )
  }
  return (
    <div style={{marginBottom: 100}}>
        <Form.Label as="h3" className="my-4 text-center">
          Uusi ilmoitus
        </Form.Label>
        <Form onSubmit={handleSubmit}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {category}
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
          <Form.File id="exampleFormControlFile1" label="Lisää kuva" onChange={(event) => handleImage(event.currentTarget.files[0])}/>
          {imageID ? <Image cloudName="dpk81nwou"publicId={imageID}/> : null }
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
          <Form.Check type="checkbox" label="Tuote on luomua" onChange={() => setOrganic(!organic)} checked={organic}/>
          <Form.Check 
            type="switch"
            id="custom-switch"
            label={isPackage ? "Kiinteä hinta" : "Eri kokoja & hintoja"}
            onChange={() => setIsPackage(!isPackage)}
          />
          {prices}
        </Form.Group>
        <Form.Row className="mb-3">
          <Col>
            <Button style={{ width: "100%" }} variant="success" size="lg" onClick={() =>setPreview(true)}>
              Esikatselu
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  )
}



export default AddProducts
