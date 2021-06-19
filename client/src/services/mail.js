import axios from "axios"

const baseUrl = "/api/mail"

const newMessage = {
  name: "Nimi",
  email: "jotain@jotain.com",
  subject: "Testtest",
  message: "Testers",
}

export const sendMail = (message) => {
  axios.post(`${baseUrl}/contact`, message)
  console.log("Test321")
}
/*console.log(sendMail(newMessage))
sendMail(newMessage)*/
