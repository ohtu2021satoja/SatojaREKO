import PasswordResetForm from "../PasswordResetForm"
import { Switch, Route } from "react-router-dom"
import LoginPage from "../login/LoginPage"
import SignUpPage from "../login/SignUpPage"
import LandingPage from "../LandingPage"

const RoutesB = ({ user, handleLogin, handleRegisterWithFacebook }) => {
  console.log("handleLogin", handleLogin)
  return (
    <Switch>
      <Route path="/login">
        <LoginPage handleLogin={handleLogin} />
      </Route>
      <Route path="/register">
        <SignUpPage
          user={user}
          handleLogin={handleLogin}
          handleRegisterWithFacebook={handleRegisterWithFacebook}
        />
      </Route>
      <Route path="/new-password">
        <PasswordResetForm />
      </Route>
      <Route exact path="/">
        <LandingPage />
      </Route>
    </Switch>
  )
}

export default RoutesB
