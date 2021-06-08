import React from "react"
import { Switch, Route } from "react-router-dom"
import HomePage from "../HomePage"
import HomePageSeller from "../HomePageSeller"
import ProfilePageSeller from "../ProfilePageSeller"
import ProductsSeller from "../ProductsSeller"
import AddProducts from "../AddProducts"
import OrdersSellerEvents from "../OrdersSellerEvents"

const RoutesSeller = ({ user, logOut, setSellerView }) => (
  <Switch>
    <Route exact path="/">
      <HomePage logOut={logOut} setSellerView={setSellerView} />
    </Route>
    <Route exact path="/home">
      <HomePageSeller />
    </Route>
    <Route path="/add">
      <AddProducts />
    </Route>
    <Route path="/products">
      <ProductsSeller ProductsSeller={user.ProductsSeller} />
    </Route>
    <Route path="/orders">
      <OrdersSellerEvents OrdersSellerEvents={OrdersSellerEvents} />
    </Route>
    <Route path="/profile">
      <ProfilePageSeller user={user} />
    </Route>
    <Route>Not found</Route>
  </Switch>
)

export default RoutesSeller
