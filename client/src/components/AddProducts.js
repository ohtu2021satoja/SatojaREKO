import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { useSelector, useDispatch } from "react-redux"
import { Image } from "cloudinary-react"
import imageService from "../services/images"
import eventService from "../services/events"
import ChooseCategory from "./ChooseCategory"
import ChooseProductType from "./ChooseProductType"
import PackagePrices from "./PackagePrices"
import Events from "./Events"
import UnitPrices from "./UnitPrices"
import Preview from "./Preview"

const AddProducts = () => {
  const [events, setEvents] = useState([])
  const [deleteBeforeEvent, setDeleteBeforeEvent] = useState(0)
  useEffect(async () => {
    const events = await eventService.getSellersUpcomingEvents(1)
    setEvents(events)
  }, [])
  const [productType, setProductType] = useState("Valitse yksikkö")
  const eventChoices = useSelector((state) => state.eventChoices)
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
  const handleImage = async (image) => {
    const response = await imageService.addImage(image)
    setImageID(response.data.public_id)
  }
  if (preview) {
    return (
      <Preview
        setPreview={setPreview}
        imageID={imageID}
        organic={organic}
        title={title}
        description={description}
        isPackage={isPackage}
        packageQuantity={packageQuantity}
        eventChoices={eventChoices}
        events={events}
        category={category}
        productType={productType}
      />
    )
  }
  return (
    <div style={{ marginBottom: 100 }}>
      <Form.Label as="h3" className="my-4 text-center">
        Uusi ilmoitus
      </Form.Label>
      <Form onSubmit={handleSubmit}>
        <ChooseCategory category={category} setCategory={setCategory} />
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
            checked={!isPackage}
            onChange={() => setIsPackage(!isPackage)}
          />
          {isPackage ? null : (
            <ChooseProductType
              productType={productType}
              setProductType={setProductType}
            />
          )}
          {prices}
          <input
            type="range"
            value={deleteBeforeEvent}
            onChange={(event) => setDeleteBeforeEvent(event.target.value)}
          />
          {events ? <Events events={events} isChoice={true} /> : null}
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
