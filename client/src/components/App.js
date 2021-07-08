import { useEffect /*, useState*/ } from "react"
import { connect } from "react-redux"
import { getAuthedUser } from "../services/users"
import { logoutUser } from "../services/auth"
import { setAuthedUser } from "../actions/authedUser"
import "../App.scss"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
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
  const { authedUser, setAuthedUser } = props

  // Get user form API
  // returns null if no user is found
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

  // Remove current user form API and update state
  const logOut = () => {
    logoutUser()
    setAuthedUser(null)
  }

  const registerWithFacebook = async () => {
    await getUser()
    await logOut()
  }

  return (
    <Container fluid>
      <Row className="vh-100">
        <Col xs={12}>
          {((authedUser && !authedUser.phonenumber) || !authedUser) && (
            <RoutesB
              user={authedUser}
              handleLogin={getUser}
              handleRegisterWithFacebook={registerWithFacebook}
            />
          )}
          {authedUser && (
            <Routes user={authedUser} handleLogOut={logOut} handleUserUpdate={getUser} />
          )}
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
