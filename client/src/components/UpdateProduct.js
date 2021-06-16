import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { useSelector, useDispatch } from "react-redux"
import { resetPrice, changePrice } from "../reducers/priceReducer"
import { setAlv } from "../reducers/alvReducer.js"
import { resetProductSizes, initializeSizes } from "../reducers/productSizesReducer"
import { Image } from "cloudinary-react"
import imageService from "../services/images"
import eventService from "../services/events"
import productService from "../services/products"
import ChooseCategory from "./ChooseCategory"
import ChooseProductType from "./ChooseProductType"
import Events from "./Events"
import UnitPrices from "./UnitPrices"
import Preview from "./Preview"
import { Formik } from "formik"
import * as yup from "yup"
import "./App.css"
import { setProductType } from "../reducers/currentProduct"

const UpdateProduct = () => {
  const productType = useSelector((state) => state.currentProduct.product.type)
  const handleImage = async (image) => {
    const response = await imageService.addImage(image)
    setImageID(response.data.public_id)
  }
  const alv = useSelector((state) => state.alv)
  const { id } = useParams()
  console.log(id)
  const dispatch = useDispatch()
  const price = useSelector((state) => state.price)
  const [events, setEvents] = useState([])
  const [deleteBeforeEvent, setDeleteBeforeEvent] = useState(24)
  const productSizes = useSelector((state) => state.productSizes)
  const eventChoices = useSelector((state) => state.eventChoices)
  const [organic, setOrganic] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Valitse kategoria")
  const [description, setDescription] = useState("")
  const [preview, setPreview] = useState(false)
  const [imageID, setImageID] = useState(null)
  const [product, setProduct] = useState(null)

  const parseType = (productType) => {
    if (productType === "kg") {
      return "Kg"
    }
    if (productType === "cube") {
      return "Kuutio"
    }
    if (productType === "l") {
      return "Litra"
    }
    if (productType === "motti") {
      return "Motti"
    }
    if (productType === "gm") {
      return "Gramma"
    }
  }

  const parseTypeBack = (productType) => {
    if (productType === "Kg") {
      return "kg"
    }
    if (productType === "Kuutio") {
      return "cube"
    }
    if (productType === "Litra") {
      return "l"
    }
    if (productType === "Motti") {
      return "motti"
    }
    if (productType === "Gramma") {
      return "gm"
    }
  }

  const initialSetUp = (product) => {
    const priceString = String(product.unit_price)
    const start = priceString.substr(0, priceString.length - 2)
    const end = priceString.substr(priceString.length - 2)
    const resString = `${start},${end}`
    dispatch(changePrice(resString))
    dispatch(setAlv(`${product.vat}%`))
    setCategory(product.category)
    setTitle(product.name)
    setDescription(product.description)
    setOrganic(product.organic)
    dispatch(setProductType(parseType(product.type)))
    setDeleteBeforeEvent(product.close_before_event)
    dispatch(initializeSizes(product.sizes))
    setImageID(product.image_url)
    setProduct(product)
  }
  useEffect(() => {
    async function fetchData() {
      const events = await eventService.getSellersUpcomingEvents(1)
      const product = {
        id: 29,
        name: "UusiName",
        organic: true,
        sellers_id: 2,
        type: "kg",
        batch_quantity: 5,
        created_at: "2021-06-01T07:36:00.129Z",
        description: "Toimiiko",
        close_before_event: 30,
        vat: 24,
        unit_price: 500,
        image_url: "profile-blank_or75kg",
        category: "Hedelmät & marjat",
        quantity_left: "1",
        sizes: [
          { quantity: 0, unit: 1, price: 500, batch_quantity: 2, id: 44 },
          {
            quantity: 1,
            unit: 1.5,
            price: 750,
            batch_quantity: 3,
            id: 45,
          },
        ],
      }
      //const product = await productService.getProduct(id)
      console.log(product)
      initialSetUp(product)
      setEvents(events)
    }
    fetchData()
  }, [])
  const updateProduct = async ({ title, description, productType, category }) => {
    const priceFloat = parseFloat(price.substring(0, price.length).replace(",", "."))
    const type = parseTypeBack(productType)
    const sizes = productSizes.map((unitSize) => {
      const unitSizeFloat = parseFloat(unitSize.size.replace(",", "."))
      const resFloat = priceFloat * unitSizeFloat
      return {
        price: resFloat,
        quantity: unitSize.quantity,
        unit: unitSizeFloat,
      }
    })
    const vat = parseInt(alv.slice(0, -1))
    const priceInt = parseInt(100 * priceFloat)

    const batch_quantity = productSizes.reduce((a, b) => a + b.quantity, 0)
    const product = {
      name: title,
      organic,
      sellers_id: 1,
      type,
      batch_quantity,
      description,
      imageURL: imageID,
      category,
      deleteBeforeEvent,
      unit_price: priceInt,
      vat,
    }
    console.log(product, eventChoices, sizes)
    await productService.updateProduct({ product, eventChoices, sizes })
  }
  if (product) {
    return (
      <ProductForm
        organic={organic}
        imageID={imageID}
        deleteBeforeEvent={deleteBeforeEvent}
        setDeleteBeforeEvent={setDeleteBeforeEvent}
        events={events}
        handleImage={handleImage}
        onSubmit={updateProduct}
        setOrganic={setOrganic}
        title={title}
        category={category}
        price={price}
        description={description}
        productSizes={productSizes}
        productId={product.id}
        FormTitle="Muokkaa ilm."
        submitButtonText="Muokkaa ilmoitusta"
      />
    )
  }
  return <div>...loading</div>
}

const ProductForm = ({
  organic,
  imageID,
  deleteBeforeEvent,
  setDeleteBeforeEvent,
  events,
  handleImage,
  onSubmit,
  setOrganic,
  title,
  category,
  productType,
  price,
  description,
  productSizes,
  FormTitle,
  submitButtonText,
}) => {
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

  return (
    <div style={{ marginBottom: 100 }}>
      <Form.Label as="h3" className="my-4 text-center">
        {FormTitle}
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
        onSubmit={onSubmit}
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
              Valitse yksikkö
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
                productType={productType}
              />
              <input
                type="range"
                value={deleteBeforeEvent}
                onChange={(event) => setDeleteBeforeEvent(event.target.value)}
              />
              <p>Tilaus sulkeutuu {deleteBeforeEvent} ennen noutotilaisuuden alkua</p>
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
                  {submitButtonText}
                </Button>
              </Col>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default UpdateProduct
