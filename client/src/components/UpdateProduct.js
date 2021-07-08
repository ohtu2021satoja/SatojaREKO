import React, { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { changePrice } from "../reducers/priceReducer"
import { setAlv } from "../reducers/alvReducer.js"
import { initializeSizes } from "../reducers/productSizesReducer"
import { initializeEvents } from "../reducers/eventChoicesReducer"
import imageService from "../services/images"
import eventService from "../services/events"
import productService from "../services/products"
import ProductForm from "./ProductForm"
import { setProductType } from "../reducers/currentProduct"

const UpdateProduct = () => {
  const productType = useSelector((state) => state.currentProduct.product.type)
  const handleImage = async (image) => {
    const response = await imageService.addImage(image)
    setImageID(response.data.public_id)
  }
  const alv = useSelector((state) => state.alv)
  const user = useSelector((state) => state.authedUser)
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
    if (productType === "kpl") {
      return "Kappale"
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
    if (productType === "Kappale") {
      return "kpl"
    }
  }
  const initialSetUp = useCallback(
    (product) => {
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
      console.log(product.events)
      dispatch(initializeEvents(product.events))
      setProduct(product)
    },
    [dispatch]
  )

  useEffect(() => {
    async function fetchData() {
      const events = await eventService.getSellersUpcomingEvents(user.id)
      const res_product = await productService.getProductById(id)
      setEvents(events)
      initialSetUp(res_product)
    }
    fetchData()
  }, [id, user.id, initialSetUp])
  const updateProduct = async ({ title, description, category }) => {
    const priceFloat = parseFloat(price.substring(0, price.length).replace(",", "."))
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
    console.log("productType", productType)
    const batch_quantity = productSizes.reduce((a, b) => a + b.quantity, 0)
    const product = {
      name: title,
      organic,
      sellers_id: user.id,
      type: parseTypeBack(productType),
      batch_quantity,
      description,
      image_url: imageID,
      category,
      close_before_event: deleteBeforeEvent,
      unit_price: priceInt,
      vat,
    }
    console.log(product)
    console.log("choices", eventChoices)
    await productService.updateProduct(id, { product, eventChoices, sizes })
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
        FormTitle="Muokkaa ilmoitusta"
        submitButtonText="Tallenna muutokset"
      />
    )
  }
  return <div>...loading</div>
}

export default UpdateProduct
