import React, { useState, useEffect } from "react"
//import Form from "react-bootstrap/Form"
//import Button from "react-bootstrap/Button"
//import Col from "react-bootstrap/Col"
import { useSelector, useDispatch } from "react-redux"
import { resetPrice } from "../reducers/priceReducer"
import { setAlv } from "../reducers/alvReducer.js"
import { resetProductSizes } from "../reducers/productSizesReducer"
//import { Image } from "cloudinary-react"
import imageService from "../services/images"
import eventService from "../services/events"
// import ChooseCategory from "./ChooseCategory"
// import ChooseProductType from "./ChooseProductType"
// import Events from "./Events"
// import UnitPrices from "./UnitPrices"
import Preview from "./Preview"
// import { Formik } from "formik"
// import * as yup from "yup"
import "./App.css"
import ProductForm from "./ProductForm"
import { setProductType } from "../reducers/currentProduct"

/*
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
*/

const AddProducts = () => {
  const dispatch = useDispatch()
  const price = useSelector((state) => state.price)
  const [events, setEvents] = useState([])
  const [deleteBeforeEvent, setDeleteBeforeEvent] = useState(24)
  const productType = useSelector((state) => state.currentProduct.product.type)
  const productSizes = useSelector((state) => state.productSizes)
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
    setCategory("Valitse kategoria")
    setPreview(false)
    setImageID(null)
    dispatch(resetPrice())
    dispatch(setProductType("Valitse yksikkö"))
    dispatch(setAlv("14%"))
    dispatch(resetProductSizes())
  }

  useEffect(() => {
    async function fetchData() {
      const events = await eventService.getSellersUpcomingEvents(1)
      setEvents(events)
    }
    Reset()
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <ProductForm
      organic={organic}
      imageID={imageID}
      deleteBeforeEvent={deleteBeforeEvent}
      setDeleteBeforeEvent={setDeleteBeforeEvent}
      events={events}
      handleImage={handleImage}
      onSubmit={goToPreview}
      setOrganic={setOrganic}
      title={title}
      category={category}
      price={price}
      description={description}
      productSizes={productSizes}
      FormTitle="Uusi ilmoitus"
      submitButtonText="Esikatselu"
    />
  )
}

export default AddProducts
