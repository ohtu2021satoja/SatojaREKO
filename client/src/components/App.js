import { useEffect, useState } from "react"
// import userAPI from "../services/users";
import "./App.css"
import Container from "react-bootstrap/Container"
import NavigationBarSeller from "./navigation/NavigationBarSeller"
import NavigationBarBuyer from "./navigation/NavigationBarBuyer"
import RoutesBuyer from "./navigation/RoutesBuyer"
import RoutesSeller from "./navigation/RoutesSeller"
import LoginPage from "./LoginPage"
import HomePage from "./HomePage"
import { Redirect } from "react-router-dom"

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [sellerView, setSellerView] = useState(null)

  useEffect(() => {
    // Get users form API
    // const allUsers = userAPI.getAll()
    const allUsers = [
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
        products: ["blueberries", "mushroome"],
      },
    ]

    setUsers(allUsers)
  }, [])

  const getCurrentUser = (email, password) => {
    const currentUser = users.find(
      (user) => user.email === email && user.password === password
    )

    setUser(currentUser === undefined ? {} : currentUser)
  }

  const logOut = () => {
    console.log("logging out")
    setUser({})
  }

  const handleViewChange = (value) => {
    setSellerView(value)
  }

  const userIsEmpty = () => {
    return Object.keys(user).length === 0
  }

  return (
    <Container fluid>
      {(() => {
        if (userIsEmpty()) return <LoginPage handleLogin={getCurrentUser} />
        if (sellerView === null)
          return <HomePage setSellerView={handleViewChange} logOut={logOut} />
        if (sellerView === true)
          return (
            <div>
              <NavigationBarSeller setSellerView={handleViewChange} />
              <RoutesSeller
                user={user}
                logOut={logOut}
                setSellerView={handleViewChange}
              />
              <Redirect to="/home" />
            </div>
          )
        if (sellerView === false)
          return (
            <div>
              <NavigationBarBuyer setSellerView={handleViewChange} />
              <RoutesBuyer user={user} logOut={logOut} setSellerView={handleViewChange} />
              <Redirect to="/events" />
            </div>
          )
      })()}
    </Container>
  )
}

export default App
