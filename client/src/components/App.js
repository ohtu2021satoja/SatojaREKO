import { useEffect } from "react"
import "../App.scss"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAuthedUser } from "../services/users"
import { logoutUser } from "../services/auth"
import { setAuthedUser } from "../actions/authedUser"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Routes from "./navigation/Routes"
import RoutesB from "./navigation/RoutesB"

const App = (props) => {
  const history = useHistory()
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

  useEffect(() => {
    console.log("AUTHED_USER", authedUser)
    if (authedUser && !authedUser.phonenumber) {
      history.push("/register")
    }
  }, [history, authedUser])

  const getUser = async () => {
    const user = await getAuthedUser()
    setAuthedUser(user)
  }

  // Remove current user and update state
  const logOut = () => {
    logoutUser()
    setAuthedUser(null)
  }

  const registerWithFacebook = () => {
    getUser()
    //history.push("/register")
    // await logOut()
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
          {authedUser && authedUser.phonenumber && (
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
