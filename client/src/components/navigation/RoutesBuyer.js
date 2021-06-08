import React from "react"
import { Switch, Route } from "react-router-dom"
import HomePage from "../HomePage"
import ProfilePageBuyer from "../ProfilePageBuyer"

const RoutesBuyer = ({ user, logOut, setSellerView }) => (
  <Switch>
    <Route exact path="/">
      <HomePage logOut={logOut} setSellerView={setSellerView} />
    </Route>
    <Route path="/orders">Orders</Route>
    <Route path="/products">
    </Route>
    <Route path="/events">Events</Route>
    <Route path="/cart">Shopping cart</Route>
    <Route path="/profile">
      <ProfilePageBuyer user={user} />
    </Route>
    <Route>Not found</Route>
  </Switch>
)

export default RoutesBuyer
