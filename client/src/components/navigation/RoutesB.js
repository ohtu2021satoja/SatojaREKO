import { Switch, Route } from "react-router-dom"
import LoginPage from "../login/LoginPage"
import SignUpPage from "../login/SignUpPage"
import NewPasswordPage from "../login/NewPasswordPage"
import LandingPage from "../LandingPage"

const RoutesB = ({ user, handleLogin }) => (
  <Switch>
    <Route path="/login">
      <LoginPage user={user} handleLogin={handleLogin} />
    </Route>
    <Route path="/register">
      <SignUpPage user={user} handleLogin={handleLogin} />
    </Route>
    <Route path="/new-password">
      <NewPasswordPage />
    </Route>
    <Route exact path="/">
      <LandingPage />
    </Route>
  </Switch>
)

export default RoutesB
