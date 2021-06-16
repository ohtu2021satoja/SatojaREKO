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
