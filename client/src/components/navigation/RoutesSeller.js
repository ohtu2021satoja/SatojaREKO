import React from "react"
import { Switch, Route } from "react-router-dom"
import HomePage from "../HomePage"
import HomePageSeller from "../HomePageSeller"
import ProfilePageSeller from "../profiles/ProfilePageSeller"
import Products from "../Products"
import OrderSeller from "../OrderSeller"
import AddProducts from "../AddProducts"
import UpdateProduct from "../UpdateProduct"
import ContactPage from "../ContactPage"

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
    <Route path="/update/:id">
      <UpdateProduct />
    </Route>
    <Route path="/add">
      <AddProducts />
    </Route>
    <Route path="/products">
      <Products products={user.products} />
    </Route>
    <Route path="/orders">
      <OrderSeller OrdersSeller={OrderSeller} />
    </Route>
    <Route path="/profile">
      <ProfilePageSeller user={user} />
    </Route>
    <Route exact path="/contact">
      <ContactPage user={user} />
    </Route>
    <Route>Not found</Route>
  </Switch>
)

export default RoutesSeller
