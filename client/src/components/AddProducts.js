import React, { useState, useEffect } from "react"
import Dropdown from "react-bootstrap/Dropdown"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { useSelector, useDispatch } from "react-redux"
import { changePrice } from "../reducers/priceReducer"
import { changeQuantity, addQuantity, changeSize } from "../reducers/productSizesReducer"
import { Image } from "cloudinary-react"
import axios from "axios"
import productService from "../services/products"
import eventService from "../services/events"

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

const Price = ({ price, setPrice }) => {
  const dispatch = useDispatch()
  const handlePrice = (newPrice) => {
    const lastchar = newPrice.slice(-1)
    if (lastchar !== "€") {
      newPrice = newPrice + "€"
    }
    setPrice(newPrice)
    dispatch(changePrice(price))
  }
  return (
    <Form.Control
      value={price}
      onChange={(event) => setPrice(event.target.value)}
      type="text"
      placeholder="00,00€"
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          handlePrice(event.target.value)
        }
      }}
    />
  )
}
const PackagePrices = ({ packageQuantity, setPackageQuantity }) => {
  const [price, setPrice] = useState("00,00€")
  return (
    <div>
      <Alv />
      Hinta (sis alv)
      <Price price={price} setPrice={setPrice} />
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

const ProductRow = ({ index }) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.productSizes)[index]
  const storageQuantity = state.quantity
  const unitSize = state.size
  const handleQuantityChange = (quantity) => {
    dispatch(changeQuantity(quantity, index))
  }
  const price = useSelector((state) => state.price)
  const priceFloat = parseFloat(price.substring(0, price.length).replace(",", "."))
  const unitSizeFloat = parseFloat(unitSize.replace(",", "."))
  console.log(unitSizeFloat)
  console.log(priceFloat)
  return (
    <div>
      <Form.Control
        value={unitSize}
        onChange={(event) => dispatch(changeSize(event.target.value, index))}
        type="text"
        placeholder="0,0"
      />
      <Form.Control
        value={storageQuantity}
        onChange={(event) => handleQuantityChange(parseInt(event.target.value))}
        type="number"
        placeholder="0"
      />
      {unitSize} {unitSizeFloat * priceFloat} {storageQuantity}
    </div>
  )
}

const UnitPrices = () => {
  const dispatch = useDispatch()
  const [price, setPrice] = useState("00,00€")
  console.log(price)
  const [productrows, setProductRows] = useState([<ProductRow key={0} index={0} />])
  const addProductRow = () => {
    dispatch(addQuantity())
    setProductRows(
      productrows.concat(
        <ProductRow key={productrows.length} index={productrows.length} />
      )
    )
  }
  return (
    <div>
      <Alv />
      Aseta kilohinta (sis alv)
      <Price price={price} setPrice={setPrice} />
      <Button onClick={addProductRow}>Lisää tuoterivi</Button>
      {productrows}
    </div>
  )
}

const Event = ({ event, setEventChoices, eventChoices, isChoice }) => {
  const addEvent = (id) => {
    let newEventChoices = eventChoices
    if (newEventChoices.includes(id)) {
      console.log("includes", newEventChoices)
      newEventChoices = newEventChoices.filter((eventID) => {
        return eventID != id
      })
    } else {
      newEventChoices.push(id)
    }
    setEventChoices(newEventChoices)
  }
  const startTime = new Date(event.start)
  const startHour = startTime.getHours()
  const startMinute = startTime.getMinutes()
  const endTime = new Date(event.endtime)
  const endHour = endTime.getHours()
  const endMinute = endTime.getMinutes()
  const Month = startTime.getMonth()
  const EventDate = startTime.getDate()
  return (
    <div>
      <p>
        {EventDate}.{Month}
      </p>
      <p>{event.name} (REKO)</p>
      <p>{event.address}</p>
      <p>
        {startHour}:{startMinute}-{endHour}:{endMinute}
      </p>
      {isChoice ? (
        <Form.Check
          type="switch"
          id="event-switch"
          label="label"
          checked={eventChoices.includes(event.id)}
          onChange={() => addEvent(event.id)}
        />
      ) : null}
    </div>
  )
}

const Events = ({ events, setEventChoices, eventChoices, isChoice }) => {
  const displayEvents = events.map((event) => (
    <Event
      key={event.id}
      event={event}
      eventChoices={eventChoices}
      setEventChoices={setEventChoices}
      isChoice={isChoice}
    />
  ))
  return <div>{displayEvents}</div>
}

const AddProducts = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      market_id: 1,
      start: "2021-05-26T13:11:47.683Z",
      endtime: "2021-05-26T13:11:47.683Z",
      area: "Etelä-Savo",
      address: "Mannerheimintie 1",
      type: "reko_market",
      areas_id: 1,
      name: "Ristiina",
      seller_id: 1,
      reko_area_id: 1,
      homepage: "www.john.fi",
      zipcode: "00100",
      county: "Uusimaa",
      salesreport_check: true,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit ipsum, adipisci delectus amet commodi ex!",
      sellerimageurl: "johnimage",
    },
  ])
  const [eventChoices, setEventChoices] = useState([])
  const price = useSelector((state) => state.price)
  const [organic, setOrganic] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Valitse kategoria")
  const [description, setDescription] = useState("")
  const [isPackage, setIsPackage] = useState(true)
  const [packageQuantity, setPackageQuantity] = useState(0)
  const [preview, setPreview] = useState(false)
  const [imageID, setImageID] = useState(null)
  const prices = isPackage ? (
    <PackagePrices
      packageQuantity={packageQuantity}
      setPackageQuantity={setPackageQuantity}
    />
  ) : (
    <UnitPrices />
  )
  const handleSubmit = (event) => {
    event.preventDefault()
    setPreview(true)
  }
  const productSizes = useSelector((state) => state.productSizes)
  const quantities = isPackage
    ? packageQuantity
    : productSizes.reduce((a, b) => a + b.quantity, 0)
  console.log(eventChoices)
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
  const PublishProduct = () => {
    const batch_quantity = isPackage
      ? packageQuantity
      : productSizes.map((size) => size.quantity)
    const product = {
      name: title,
      organic,
      sellers_id: 1,
      type: "pc",
      batch_quantity,
      description,
      imageURL: imageID,
      category,
    }
    productService.addProduct(product)
  }
  if (preview) {
    const previewEvents = events.filter((event) => {
      return eventChoices.includes(event.id)
    })
    return (
      <div>
        <h2>Esikatselu</h2>
        <Button variant="primary" onClick={() => setPreview(false)}>
          Back
        </Button>
        <br />
        {imageID ? <Image cloudName="dpk81nwou" publicId={imageID} /> : "Ei kuvaa"}
        <br />
        <Button variant={organic ? "success" : "danger"}>
          {organic ? "Luomua" : "Ei luomua"}
        </Button>
        <h3>{title}</h3>
        <p>{description}</p>
        {isPackage ? <h4>{price}/kpl</h4> : null}
        {isPackage ? <p>Varastoarvo: {packageQuantity}</p> : null}
        <Events
          events={previewEvents}
          eventChoices={eventChoices}
          setEventChoices={setEventChoices}
          isChoice={false}
        />
        <Button
          style={{ width: "100%" }}
          variant="success"
          size="lg"
          onClick={PublishProduct}
        >
          Julkaise
        </Button>
      </div>
    )
  }
  return (
    <div style={{ marginBottom: 100 }}>
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
          <Form.File
            id="exampleFormControlFile1"
            label="Lisää kuva"
            onChange={(event) => handleImage(event.currentTarget.files[0])}
          />
          {imageID ? <Image cloudName="dpk81nwou" publicId={imageID} /> : null}
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
          <Form.Check
            type="checkbox"
            label="Tuote on luomua"
            onChange={() => setOrganic(!organic)}
            checked={organic}
          />
          <Form.Check
            type="switch"
            id="custom-switch"
            label={isPackage ? "Kiinteä hinta" : "Eri kokoja & hintoja"}
            onChange={() => setIsPackage(!isPackage)}
          />
          {prices}
          {events ? (
            <Events
              events={events}
              eventChoices={eventChoices}
              setEventChoices={setEventChoices}
              isChoice={true}
            />
          ) : null}
        </Form.Group>
        <Form.Row className="mb-3">
          <Col>
            <Button
              style={{ width: "100%" }}
              variant="success"
              size="lg"
              onClick={() => setPreview(true)}
            >
              Esikatselu
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  )
}

export default AddProducts
