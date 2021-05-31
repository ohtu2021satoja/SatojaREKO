/*
import axios from "axios"

const apiUrl = "/api/users"

const getUsers = async () => {
  const response = await axios.get(apiUrl)
  return response.data
}
*/

const users = [
  {
    id: 1,
    email: "user1@a.com",
    password: "pw1",
    products: ["milk", "bread"],
  },
  {
    id: 2,
    email: "user2@a.com",
    password: "pw2",
    products: ["blueberries", "mushrooms"],
  },
]

export const getUsers = () => {
  return users
}
