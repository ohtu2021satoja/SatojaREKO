import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import MapPage from "../MapPage"
import ShoppingCart from "../ShoppingCart"
import EventPage from "../EventPage"
import ProductPage from "../ProductPage"
import SellerPage from "../SellerPage"
import NavigationBarBuyer from "./NavigationBarBuyer"
import LoginPage from "../login/LoginPage"
import SignUpPage from "../login/SignUpPage"
import NewPasswordPage from "../login/NewPasswordPage"
import LandingPage from "../LandingPage"

const RoutesLoggedOff = ({ user, fullyAuthorized, handleLogin }) => (
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
    {/* ALL SELLER ROUTES REQUIRE AUTHORIZATION */}
    <Redirect from="/home" to="/login" />
    <Redirect from="/add" to="/login" />
    <Redirect from="/update/:id" to="/login" />
    <Redirect from="/products" to="/login" />
    <Redirect from="/orders/seller" to="/login" />
    <Redirect from="/profile/seller" to="/login" />
    <Redirect from="/contact" to="/login" />
    {/* BUYER ROUTES THAT REQUIRE AUTHORIZATION */}
    <Redirect from="/orders/buyer" to="/login" />
    <Redirect from="/profile/buyer" to="/login" />
    <Redirect from="/orders/buyer/:eventID" to="/login" />
    {/* FREELY ACCESSIBLE BUYER ROUTES */}
    <Route exact path="/map">
      <NavigationBarBuyer />
      <MapPage />
    </Route>
    <Route exact path="/cart">
      <NavigationBarBuyer />
      <ShoppingCart fullyAuthorized={fullyAuthorized} />
    </Route>
    <Route
      path="/events/:eventID"
      exact={true}
      render={(props) => {
        //console.log("PROPS IN ROUTE: ", props)
        return (
          <>
            <NavigationBarBuyer />
            <EventPage {...props} />
          </>
        )
      }}
    />
    <Route
      path="/events/:eventID/products/:productID"
      exact={true}
      render={(props) => {
        return (
          <>
            <NavigationBarBuyer />
            <ProductPage {...props} />
          </>
        )
      }}
    />
    <Route
      path="/sellers/:sellerID"
      exact={true}
      render={(props) => {
        return (
          <>
            <NavigationBarBuyer />
            <SellerPage {...props} />
          </>
        )
      }}
    />
    {/* NONEXISTENT ROUTE */}
    <Route>Not found</Route>
  </Switch>
)

export default RoutesLoggedOff
