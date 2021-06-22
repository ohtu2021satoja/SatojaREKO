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
    <Route exact path="/orders">
      <OrdersBuyers />
    </Route>
    <Route exact path="/map">
      <MapPage />
    </Route>
    <Route exact path="/cart">
      <ShoppingCart />
    </Route>
    <Route exact path="/profile">
      <ProfilePageBuyer user={user} />
    </Route>
    <Route path="/events/:eventID" exact component={EventPage} />
    <Route path="/events/:eventID/products/:productID" exact component={ProductPage} />
    <Route path="/sellers/:sellerID" exact component={SellerPage} />
    <Route>Not found</Route>
  </Switch>
)

export default RoutesBuyer
