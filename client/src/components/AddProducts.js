import React, { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { useSelector, useDispatch } from "react-redux"
import { resetPrice } from "../reducers/priceReducer"
import { setAlv } from "../reducers/alvReducer.js"
import { resetProductSizes } from "../reducers/productSizesReducer"
import { Image } from "cloudinary-react"
import imageService from "../services/images"
import eventService from "../services/events"
import ChooseCategory from "./ChooseCategory"
import ChooseProductType from "./ChooseProductType"
import Events from "./Events"
import UnitPrices from "./UnitPrices"
import Preview from "./Preview"
import { Formik } from "formik"
import * as yup from "yup"
import "./App.css"

const validationSchema = yup.object().shape({
  title: yup.string().required("Vaadittu"),

  description: yup.string().required("Vaadittu"),

  productType: yup.string().notOneOf(["Valitse yksikkö"], "Valitse yksikkö"),

  price: yup.string().notOneOf(["00,00€"], "Aseta hinta"),

  sizes: yup
    .array()
    .required()
    .of(yup.number().min(0.000001, "Pakettikoko ei voi olla nolla")),

  quantities: yup
    .array()
    .required()
    .of(yup.number().min(1, "Pakettimäärä ei voi olla nolla")),

  category: yup.string().notOneOf(["Valitse kategoria"], "Valitse kategoria"),
})

const AddProducts = () => {
  const dispatch = useDispatch()
  const price = useSelector((state) => state.price)
  const [events, setEvents] = useState([])
  const [deleteBeforeEvent, setDeleteBeforeEvent] = useState(24)
  useEffect(() => {
    async function fetchData() {
      const events = await eventService.getSellersUpcomingEvents(1)
      setEvents(events)
    }
    fetchData()
  }, [])
  const productSizes = useSelector((state) => state.productSizes)
  const [productType, setProductType] = useState("Valitse yksikkö")
  const eventChoices = useSelector((state) => state.eventChoices)
  const [organic, setOrganic] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Valitse kategoria")
  const [description, setDescription] = useState("")
  const [preview, setPreview] = useState(false)
  const [imageID, setImageID] = useState(null)
  const handleImage = async (image) => {
    const response = await imageService.addImage(image)
    setImageID(response.data.public_id)
  }

  const Reset = () => {
    setTitle("")
    setDescription("")
    setOrganic(false)
    setProductType("Valitse yksikkö")
    setCategory("Valitse kategoria")
    setPreview(false)
    setImageID(null)
    dispatch(resetPrice())
    dispatch(setAlv("14%"))
    dispatch(resetProductSizes())
  }
  const goToPreview = ({ title, description, productType, category }) => {
    setTitle(title)
    setDescription(description)
    setProductType(productType)
    setCategory(category)
    setPreview(true)
  }

  if (preview) {
    return (
      <Preview
        setPreview={setPreview}
        imageID={imageID}
        organic={organic}
        title={title}
        description={description}
        eventChoices={eventChoices}
        events={events}
        category={category}
        productType={productType}
        deleteBeforeEvent={deleteBeforeEvent}
        Reset={Reset}
      />
    )
  }
  return (
    <div style={{ marginBottom: 100 }}>
      <Form.Label as="h3" className="my-4 text-center">
        Uusi ilmoitus
      </Form.Label>
      <Formik
        initialValues={{
          category: category,
          title: title,
          description: description,
          productType: productType,
          price: price,
          sizes: productSizes.map((size) => parseFloat(size.size.replace(",", "."))),
          quantities: productSizes.map((size) => size.quantity),
        }}
        onSubmit={goToPreview}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
          isValid,
          validationSchema,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <ChooseCategory category={values.category} setFieldValue={setFieldValue} />
            {touched.category && errors.category ? <div>{errors.category}</div> : null}
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Lisää kuva"
                onChange={(event) => handleImage(event.currentTarget.files[0])}
              />
              <div>{values.sizes}</div>
              {imageID ? <Image cloudName="dpk81nwou" publicId={imageID} /> : null}
              <Form.Control
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                type="text"
                placeholder="Otsikko"
              />
              {touched.title && errors.title ? <div>{errors.title}</div> : null}
              <Form.Control
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                type="text"
                placeholder="Tuotekuvaus"
              />
              {touched.description && errors.description ? (
                <div>{errors.description}</div>
              ) : null}
              <Form.Check
                type="checkbox"
                label="Tuote on luomua"
                onChange={() => setOrganic(!organic)}
                checked={organic}
              />
              <ChooseProductType
                productType={values.productType}
                setFieldValue={setFieldValue}
              />
              {touched.productType && errors.productType ? (
                <div>{errors.productType}</div>
              ) : null}
              <UnitPrices
                setFieldValue={setFieldValue}
                sizes={values.sizes}
                quantities={values.quantities}
                errors={errors}
                touched={touched}
              />
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
                  type="submit"
                >
                  Esikatselu
                </Button>
              </Col>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddProducts
