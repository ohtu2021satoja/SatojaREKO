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
import AdminPage from "./AdminPage"

const App = (props) => {
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

  return <AdminPage />
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
