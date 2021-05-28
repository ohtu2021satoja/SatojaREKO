import axios from "axios"

const addImage = async (image) => {
  const formData = new FormData()
  formData.append("file", image)
  formData.append("upload_preset", "ml_default")
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dpk81nwou/image/upload",
    formData
  )
  return response
}

export default { addImage }
