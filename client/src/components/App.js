
import { /*useEffect,*/ useState } from "react"
import { connect } from "react-redux"
//import { handleInitialData } from "../actions/shared"
import { setAuthedUser, logoutUser } from "../actions/authedUser"
import "./App.css"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import LoginPage from "./LoginPage"
import HomePage from "./HomePage"
import AppSeller from "./AppSeller"
import AppBuyer from "./AppBuyer"

const App = (props) => {
  const [sellerView, setSellerView] = useState(null)

  const { authedUser, products } = props

  /*
  useEffect(() => {
    // Get data form API
    props.handleInitialData()
  }, [props])
  */

  const loginWithFacebook = (id) => props.setAuthedUser(id)

  const logOut = () => props.logoutUser()

  const handleViewChange = (value) => {
    setSellerView(value)
  }

  return (
    <Container fluid>
      <Row className="vh-100">
        <Col
          xs={12}
          sm={{ span: 8, offset: 2 }}
          style={{ backgroundColor: "white", paddingBottom: 70 }}
        >
          {(() => {
            if (!authedUser) return <LoginPage handleLogin={loginWithFacebook} />

            if (sellerView === null)
              return <HomePage setSellerView={handleViewChange} logOut={logOut} />

            if (sellerView === true)
              return (
                <AppSeller
                  products={products}
                  user={authedUser}
                  logOut={logOut}
                  setSellerView={handleViewChange}
                />
              )

            if (sellerView === false)
              return (
                <AppBuyer
                  products={products}
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

const mapStateToProps = ({ authedUser, products }) => {
  return {
    authedUser,
    products,
  }
}

export default connect(mapStateToProps, {
  /*handleInitialData,*/ setAuthedUser,
  logoutUser,
})(App)