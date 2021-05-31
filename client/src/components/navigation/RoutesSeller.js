import React from "react"
import { Switch, Route } from "react-router-dom"
import HomePage from "../HomePage"
import HomePageSeller from "../HomePageSeller"
import ProfilePageSeller from "../ProfilePageSeller"
import Products from "../Products"
import OrdersSellerProducts from "../OrdersSellerProducts"
import AddProducts from "../AddProducts"
import OrdersSellerEvents from "../OrdersSellerEvents"
import OrdersSellerBuyers from "../OrdersSellerBuyers"

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
      <Products products={user.products} />
    </Route>
    <Route path="/orders">
      <OrdersSellerEvents OrdersSellerEvents={OrdersSellerEvents} />
    </Route>
    <Route path="/orderproducts">
      <OrdersSellerProducts OrdersSellerProducts={OrdersSellerProducts} />
    </Route>
    <Route path="/orderbuyers">
      <OrdersSellerBuyers OrdersSellerBuyers={OrdersSellerBuyers} />
    </Route>
    <Route path="/profile">
      <ProfilePageSeller user={user} />
    </Route>
    <Route>Not found</Route>
  </Switch>
)

export default RoutesSeller
