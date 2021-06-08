import React from "react"
import { Switch, Route } from "react-router-dom"
import HomePage from "../HomePage"
import ProfilePageBuyer from "../profiles/ProfilePageBuyer"
import MapPage from "../MapPage"
import Products from "../Products"
import ShoppingCart from "../ShoppingCart"

const RoutesBuyer = ({ user, logOut, setSellerView }) => (
  <Switch>
    <Route exact path="/">
      <HomePage logOut={logOut} setSellerView={setSellerView} />
    </Route>
    <Route path="/orders">Orders</Route>
    <Route path="/products">
      <Products products={user.products} />
    </Route>
    <Route path="/events" component={MapPage}></Route>
    <Route path="/cart" component={ShoppingCart}></Route>
    <Route path="/profile">
      <ProfilePageBuyer user={user} />
    </Route>
    <Route>Not found</Route>
  </Switch>
)

export default RoutesBuyer
