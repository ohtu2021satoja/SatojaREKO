import { useEffect, useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplateTopNav from "../TemplateTopNav"
import FacebookSignUpButton from "./FacebookSignUpButton"
import FormSignUp from "./FormSignUp"
import NotificationSuccess from "../NotificationSuccess"

const SignUpPage = ({ user, handleLogin, handleRegisterWithFacebook }) => {
  const [facebookUser, setFacebookUser] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // if user registered via Facebook
    // change schema and update the form
    user && user.facebook_id ? setFacebookUser(true) : setFacebookUser(false)
  }, [user, facebookUser])

  return (
    <>
      <NotificationSuccess
        show={show}
        handleClose={() => setShow(false)}
        delay={3000}
        message="Tarkista sähköpostisi. Lähetimme sinulle vahvistusviestin."
      />
      <Row className="h-100">
        <TemplateTopNav
          navLink="/login"
          altText="Palaa kirjautumissivulle"
          navHeader="Luo tili"
        />
        <Col
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
        >
          {facebookUser === false && (
            <FacebookSignUpButton
              handleRegisterWithFacebook={handleRegisterWithFacebook}
            />
          )}
          <FormSignUp
            user={user}
            handleLogin={handleLogin}
            facebookUser={facebookUser}
            handleNotification={() => setShow(true)}
          />
        </Col>
      </Row>
    </>
  )
}

export default SignUpPage
