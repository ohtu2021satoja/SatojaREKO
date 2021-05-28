import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { handleInitialData } from "../actions/shared"
import "./App.css"
import Container from "react-bootstrap/Container"
import NavigationBarSeller from "./navigation/NavigationBarSeller"
import NavigationBarBuyer from "./navigation/NavigationBarBuyer"
import RoutesBuyer from "./navigation/RoutesBuyer"
import RoutesSeller from "./navigation/RoutesSeller"
import LoginPage from "./LoginPage"
import HomePage from "./HomePage"
import { Redirect } from "react-router-dom"

const App = (props) => {
  const [user, setUser] = useState({})
  const [sellerView, setSellerView] = useState(null)

  const { /*authedUser,*/ products, users } = props

  useEffect(() => {
    // Get data form API
    props.handleInitialData()
  }, [props])

  const getCurrentUser = (email, password) => {
    const currentUser = users.find(
      (user) => user.email === email && user.password === password
    )

    setUser(currentUser === undefined ? {} : currentUser)
  }

  const logOut = () => {
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
                products={products}
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
              <RoutesBuyer
                products={products}
                user={user}
                logOut={logOut}
                setSellerView={handleViewChange}
              />
              <Redirect to="/events" />
            </div>
          )
      })()}
    </Container>
  )
}

const mapStateToProps = ({ authedUser, products, users }) => {
  return {
    authedUser,
    products,
    users,
  }
}

export default connect(mapStateToProps, { handleInitialData })(App)
