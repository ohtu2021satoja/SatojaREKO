import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getAuthedUser } from "../services/users"
import { logoutUser } from "../services/auth"
import { setAuthedUser } from "../actions/authedUser"
import "../App.scss"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import SignUpPage from "./login/SignUpPage"
// import AdminPage from "./AdminPage"
import Routes from "./navigation/Routes"
import RoutesB from "./navigation/RoutesB"
import { isEqual } from "lodash"

const App = (props) => {
  const func = async () => {
    const bool = await isEqual(
      { name: "lol", objects: [{ name: "lol" }] },
      { name: "lol", objects: [{ name: "lol" }] }
    )
    console.log("BOOL", bool)
  }
  func()
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

  const registerUser = () => {
    getUser()
    setSignUp(false)
  }

  // Remove current user form API and update state
  const logOut = () => {
    logoutUser()
    setAuthedUser(null)
  }

  return (
    <Container fluid>
      <Row className="vh-100">
        <Col xs={12} sm={{ span: 8, offset: 2 }}>
          {(() => {
            if (!authedUser && !signUp) {
              return (
                <>
                  <RoutesB handleLogin={getUser} handleSigned={() => setSignUp(true)} />
                </>
              )
            }

            if ((authedUser && !authedUser.phonenumber) || (!authedUser && signUp)) {
              return (
                <SignUpPage
                  user={authedUser}
                  handleSigned={() => setSignUp(false)}
                  handleFacebookSignUp={getUser}
                  handleRegisterUser={registerUser}
                />
              )
            }

            if (authedUser) {
              return (
                <>
                  <Routes user={authedUser} logOut={logOut} handleUserUpdate={getUser} />
                </>
              )
            }
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
