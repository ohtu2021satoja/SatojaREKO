import { useEffect, useState } from "react"
import "../App.scss"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAuthedUser } from "../services/users"
import { logoutUser } from "../services/auth"
import { setAuthedUser } from "../actions/authedUser"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import RoutesLoggedOff from "./navigation/RoutesLoggedOff"
import RoutesLoggedIn from "./navigation/RoutesLoggedIn"

const App = (props) => {
  const history = useHistory()
  const { authedUser, setAuthedUser } = props
  const [fullyAuthorized, setFullyAuthorized] = useState(false)

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

  // Check if Facebook sign up
  // has been completed
  useEffect(() => {
    if (authedUser && !authedUser.phonenumber) {
      history.push("/register")
    } else if (authedUser && authedUser.phonenumber) {
      setFullyAuthorized(true)
    }
  }, [history, authedUser, setFullyAuthorized])

  const getUser = async () => {
    const user = await getAuthedUser()
    setAuthedUser(user)
  }

  // Remove current user and update state
  const logOut = () => {
    logoutUser()
    setAuthedUser(null)
    setFullyAuthorized(false)
  }

  return (
    <Container fluid>
      <Row className="vh-100">
        <Col xs={12}>
          {!fullyAuthorized && (
            <RoutesLoggedOff
              user={authedUser}
              handleLogin={getUser}
              fullyAuthorized={fullyAuthorized}
            />
          )}
          {fullyAuthorized && (
            <RoutesLoggedIn
              user={authedUser}
              handleLogOut={logOut}
              handleUserUpdate={getUser}
              fullyAuthorized={fullyAuthorized}
            />
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
