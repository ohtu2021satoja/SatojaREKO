import axios from "axios"

const baseUrl = "/api/mail"

const newMessage = {
  name: "Nimi",
  email: "jotain@jotain.com",
  subject: "Testtest",
  message: "Testers",
}

export const sendMail = async (message) => {
  try {
    const response = await axios.post(`${baseUrl}/contact`, message)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err.message)
    return "error"
  }
}
/*console.log(sendMail(newMessage))
sendMail(newMessage)*/
