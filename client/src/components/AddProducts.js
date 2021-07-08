import React, { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { resetPrice } from "../reducers/priceReducer"
import { setAlv } from "../reducers/alvReducer.js"
import { resetProductSizes } from "../reducers/productSizesReducer"
import imageService from "../services/images"
import eventService from "../services/events"
import Preview from "./Preview"
import ProductForm from "./ProductForm"
import { setProductType } from "../reducers/currentProduct"

const AddProducts = () => {
  const dispatch = useDispatch()
  // const price = useSelector((state) => state.price)
  const [events, setEvents] = useState([])
  const user = useSelector((state) => state.authedUser)
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
  const [eventChoiceError, setEventChoiceError] = useState(false)
  const handleImage = async (image) => {
    const response = await imageService.addImage(image)
    setImageID(response.data.public_id)
  }

  const Reset = useCallback(() => {
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
  }, [dispatch])

  useEffect(() => {
    async function fetchData() {
      const events = await eventService.getSellersUpcomingEvents(user.id)
      await setEvents(events)
      Reset()
    }
    fetchData()
  }, [Reset, user.id])

  const goToPreview = ({ title, description, productType, category }) => {
    if (eventChoices.length > 0) {
      setTitle(title)
      setDescription(description)
      setProductType(productType)
      setCategory(category)
      setPreview(true)
    } else setEventChoiceError(true)
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
      price={""}
      description={description}
      productSizes={productSizes}
      FormTitle="Uusi ilmoitus"
      submitButtonText="Esikatselu"
      eventChoices={eventChoices}
      eventChoiceError={eventChoiceError}
      setEventChoiceError={setEventChoiceError}
    />
  )
}

export default AddProducts
