import PasswordResetForm from "../PasswordResetForm"
import { Switch, Route } from "react-router-dom"
import LoginPage from "../login/LoginPage"

const RoutesB = ({ handleLogin, handleSigned }) => {
  console.log("handleLogin", handleLogin)
  return (
    <Switch>
      <Route exact path="/">
        <LoginPage handleLogin={handleLogin} handleSigned={handleSigned} />
      </Route>
      <Route path="/passwordreset">
        <PasswordResetForm />
      </Route>
    </Switch>
  )
}

export default RoutesB
