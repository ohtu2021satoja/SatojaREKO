import { useEffect, useState } from "react"
import Row from "react-bootstrap/Row"
import SignUpNav from "./SignUpNav"
import FormSignUp from "./FormSignUp"
// import PasswordResetButton from "./PasswordResetButton"

const SignUpPage = ({ user, handleSigned, handleFacebookSignUp, handleRegisterUser }) => {
  const [facebookUser, setFacebookUser] = useState(false)

  useEffect(() => {
    // if user registered via Facebook
    // change schema and update the form
    user && user.facebook_id ? setFacebookUser(true) : setFacebookUser(false)
  }, [user, facebookUser])

  return (
    <Row className="h-100">
      <SignUpNav facebookUser={facebookUser} handleSigned={handleSigned} />
      <FormSignUp
        user={user}
        facebookUser={facebookUser}
        handleSigned={handleSigned}
        handleFacebookSignUp={handleFacebookSignUp}
        handleRegisterUser={handleRegisterUser}
      />
    </Row>
  )
}

export default SignUpPage
