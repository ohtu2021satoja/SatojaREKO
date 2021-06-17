import React from "react"
import { Switch, Route } from "react-router-dom"
import HomePage from "../HomePage"
import ProfilePageBuyer from "../profiles/ProfilePageBuyer"
import MapPage from "../MapPage"
import ShoppingCart from "../ShoppingCart"
import OrdersBuyers from "../OrdersBuyers"
import EventPage from "../EventPage"
import ProductPage from "../ProductPage"
import SellerPage from "../SellerPage"

const RoutesBuyer = ({ user, logOut, setSellerView }) => (
  <Switch>
    <Route exact path="/">
      <HomePage logOut={logOut} setSellerView={setSellerView} />
    </Route>
    <Route path="/orders">
      <OrdersBuyers />
    </Route>
    <Route path="/map">
      <MapPage />
    </Route>
    <Route path="/cart">
      <ShoppingCart />
    </Route>
    <Route path="/profile">
      <ProfilePageBuyer user={user} />
    </Route>
    <Route path="/events/:id" exact component={EventPage}></Route>
    <Route path="/products/:id" exact component={ProductPage}></Route>
    <Route path="/sellers/:id" exact component={SellerPage}></Route>
    <Route>Not found</Route>
  </Switch>
)

export default RoutesBuyer
