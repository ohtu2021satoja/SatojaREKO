import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getAuthedUser, logoutUser } from "../services/users"
import { setAuthedUser } from "../actions/authedUser"
import "./App.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import LoginPage from "./login/LoginPage"
import FacebookSignUpPage from "./login/FacebookSignUpPage"
import HomePage from "./HomePage"
import AppSeller from "./AppSeller"
import AppBuyer from "./AppBuyer"

const App = (props) => {
  const [sellerView, setSellerView] = useState(null)
  const [signUp, setSignUp] = useState(false)
  const { authedUser, setAuthedUser } = props

  // Get user form API
  // promise returns undefined if no user is found
  useEffect(() => {
    getAuthedUser().then(({ user }) => (user ? setAuthedUser(user) : setAuthedUser(null)))
  }, [props, setAuthedUser])

  const getUser = async () => {
    const user = await getAuthedUser()
    setAuthedUser(user)
  }

  const facebookSignUp = () => {
    getUser()
    setSignUp(true)
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
        <p>{authedUser}</p>
        <Col
          xs={12}
          sm={{ span: 8, offset: 2 }}
          style={{ backgroundColor: "white", paddingBottom: 70 }}
        >
          {(() => {
            if (!authedUser)
              return (
                <LoginPage
                  handleFacebookLogin={() => getUser()}
                  handleFacebookSignUp={facebookSignUp}
                />
              )

            if (signUp)
              return (
                <FacebookSignUpPage
                  user={authedUser}
                  handleSignUp={() => setSignUp(false)}
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
