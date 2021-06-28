import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getAuthedUser } from "../services/users"
import { logoutUser } from "../services/auth"
import { setAuthedUser } from "../actions/authedUser"
//mport "./App.css"
// sass with Bootstrap CSS
import "../App.scss"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import LoginPage from "./login/LoginPage"
import SignUpPage from "./login/SignUpPage"
// import AdminPage from "./AdminPage"
import Routes from "./navigation/Routes"

const App = (props) => {
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
      id: "75",
      firstname: "Satoja",
      lastname: "Reko",
      created_at: "2021-06-21T11:57:16.859Z",
      phonenumber: "9++043024",
      email: "satojareko@gmail.com",
      password: null,
      is_buyer: false,
      is_seller: false,
      facebook_id: "108265444800905",
      newsletter_check: false,
      cancel_notification_check: false,
      image_url: "profile-blank_or75kg",
      name: null,
      homepage: null,
      address: null,
      zipcode: null,
      city: null,
      salesreport_check: false,
      description: null,
      location: null,
      sellers_image_url: "profile-blank_or75kg",
      buyers_image_url: "profile-blank_or75kg",
      reko_areas: [
        {
          id: 1,
          name: "Ristiina",
          belongs: false,
        },
        {
          id: 2,
          name: "Mikkeli",
          belongs: false,
        },
        {
          id: 3,
          name: "Mäntyharju",
          belongs: false,
        },
        {
          id: 4,
          name: "Puumala",
          belongs: false,
        },
        {
          id: 5,
          name: "Pertunmaa",
          belongs: false,
        },
        {
          id: 6,
          name: "Pieksämäki",
          belongs: false,
        },
        {
          id: 7,
          name: "Juva",
          belongs: false,
        },
        {
          id: 8,
          name: "testi",
          belongs: false,
        },
      ],
    }

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
                <LoginPage
                  handleLogin={getUser}
                  handleSigned={() => setSignUp(true)}
                  handleMockLogin={getMockUser}
                />
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
