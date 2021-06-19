import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getAuthedUser } from "../services/users"
import { logoutUser } from "../services/logout"
import { setAuthedUser } from "../actions/authedUser"
import "./App.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import LoginPage from "./login/LoginPage"
import SignUpPage from "./login/SignUpPage"
import HomePage from "./HomePage"
import AppSeller from "./AppSeller"
import AppBuyer from "./AppBuyer"

const App = (props) => {
  const [sellerView, setSellerView] = useState(null)
  const [signUp, setSignUp] = useState(false)
  const { authedUser, setAuthedUser } = props

  // Get user form API
  // promise returns null if no user is found
  useEffect(() => {
    const fetchData = async () => {
      const user = await getAuthedUser()
      console.log(user)
      user ? setAuthedUser(user) : setAuthedUser(null)
    }
    fetchData()
  }, [setAuthedUser])

  const getUser = async () => {
    const user = await getAuthedUser()
    setAuthedUser(user)
  }

  // develoment workaroud
  const getMockUser = () => {
    const user = {
      id: "111",
      name: "Olli",
      surname: "Ostaja",
    }

    setAuthedUser(user)
  }

  const signUpWithFacebook = () => {
    getUser()
    setSignUp(true)
  }

  const registerUser = (user) => {
    setAuthedUser(user)
    setSignUp(false)
  }

  // Remove current user form API and update state
  const logOut = () => {
    logoutUser()
    setAuthedUser(null)
  }

  const handleViewChange = (value) => setSellerView(value)

  return (
    <Container fluid>
      <Row className="vh-100">
        <Col
          xs={12}
          sm={{ span: 8, offset: 2 }}
          style={{ backgroundColor: "white", paddingBottom: 70 }}
        >
          {(() => {
            if (!authedUser && !signUp)
              return (
                <LoginPage
                  handleFacebookLogin={getUser}
                  handleFacebookSignUp={signUpWithFacebook}
                  handleMockLogin={getMockUser}
                />
              )

            if (signUp)
              return (
                <SignUpPage
                  user={authedUser}
                  handleSigned={() => setSignUp(false)}
                  handleRegisterUser={registerUser}
                />
              )

            if (authedUser && sellerView === null)
              return <HomePage setSellerView={handleViewChange} logOut={logOut} />

            if (sellerView === true)
              return (
                <AppSeller
                  user={authedUser}
                  logOut={logOut}
                  setSellerView={handleViewChange}
                />
              )

            if (sellerView === false)
              return (
                <AppBuyer
                  user={authedUser}
                  logOut={logOut}
                  setSellerView={handleViewChange}
                />
              )
          })()}
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps, {
  setAuthedUser,
})(App)
