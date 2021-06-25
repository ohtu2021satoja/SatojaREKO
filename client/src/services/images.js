import axios from "axios"

export const addImage = async (image) => {
  try {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "ml_default")
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dpk81nwou/image/upload",
      formData
    )
    console.log("CLOUDINARY", response)
    return response
  } catch (err) {
    console.log(err.message)
    return "error"
  }
}

export default { addImage }
