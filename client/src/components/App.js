import { /*useEffect,*/ useState } from "react"
import { connect } from "react-redux"
//import { handleInitialData } from "../actions/shared"
import { setAuthedUser, logoutUser } from "../actions/authedUser"
import "./App.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import LoginPage from "./login/LoginPage"
import SignUpPage from "./login/SignUpPage"
import HomePage from "./HomePage"
import AppSeller from "./AppSeller"
import AppBuyer from "./AppBuyer"
import Cookies from "js-cookie"

const App = (props) => {
  console.log(Cookies.get())
  const [sellerView, setSellerView] = useState(null)
  const [signUp, setSignUp] = useState(false)
  const { authedUser, setAuthedUser, logoutUser } = props

  /*
  useEffect(() => {
    // Get data form API
    // props.handleInitialData()
  }, [props])
  */

  // Facebook login/sign up - temporary workaround
  const signOut = () => setSignUp(false)

  const loginWithFacebook = (id) => {
    setAuthedUser(id)
    signOut()
  }

  const activateSignUp = (user) => {
    setAuthedUser(user)
    setSignUp(true)
  }

  const logOut = () => logoutUser()

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
            if (authedUser && signUp)
              return (
                <SignUpPage
                  user={authedUser}
                  handleSignUp={activateSignUp}
                  handleSignOut={signOut}
                  handleLogout={logOut}
                />
              )

            if (!authedUser)
              return (
                <LoginPage
                  signed={signUp}
                  handleLogin={loginWithFacebook}
                  handleSignUp={activateSignUp}
                />
              )

            if (sellerView === null && !signUp)
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
  /*handleInitialData,*/ setAuthedUser,
  logoutUser,
})(App)
