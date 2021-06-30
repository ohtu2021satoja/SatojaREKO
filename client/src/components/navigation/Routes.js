import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import HomePage from "../HomePage"
import HomePageSeller from "../HomePageSeller"
import ProfilePageSeller from "../profiles/ProfilePageSeller"
import Products from "../Products"
import OrderSeller from "../OrderSeller"
import AddProducts from "../AddProducts"
import UpdateProduct from "../UpdateProduct"
import ContactPage from "../ContactPage"
import MapPage from "../MapPage"
import ShoppingCart from "../ShoppingCart"
import OrdersBuyer from "../OrdersBuyer"
import OrdersBuyerProducts from "../OrdersBuyerProducts"
import EventPage from "../EventPage"
import ProductPage from "../ProductPage"
import SellerPage from "../SellerPage"
import ProfilePageBuyer from "../profiles/ProfilePageBuyer"
import NavigationBarBuyer from "./NavigationBarBuyer"
import NavigationBarSeller from "./NavigationBarSeller"
import AdminPage from "../AdminPage"

const Routes = ({ user, logOut, handleUserUpdate }) => (
  <Switch>
    <Route exact path="/">
      <HomePage />
    </Route>
    {/* ADMIN ROUTES */}
    <Route path="/admin">{user.is_admin ? <AdminPage /> : <Redirect to="/" />}</Route>
    {/* SELLER ROUTES */}
    <Route exact path="/home">
      <NavigationBarSeller />
      <HomePageSeller />
    </Route>
    <Route path="/add">
      <NavigationBarSeller />
      <AddProducts />
    </Route>
    <Route path="/update/:id">
      <NavigationBarSeller />
      <UpdateProduct />
    </Route>
    <Route path="/add">
      <NavigationBarSeller />
      <AddProducts />
    </Route>
    <Route path="/products">
      <NavigationBarSeller />
      <Products products={user.products} />
    </Route>
    <Route path="/orders/seller">
      <NavigationBarSeller />
      <OrderSeller OrdersSeller={OrderSeller} />
    </Route>
    <Route path="/profile/seller">
      <NavigationBarSeller />
      <ProfilePageSeller
        user={user}
        handleUserUpdate={handleUserUpdate}
        logOut={logOut}
      />
    </Route>
    <Route exact path="/contact">
      <NavigationBarSeller />
      <ContactPage user={user} />
    </Route>
    {/* BUYER ROUTES */}
    <Route exact path="/orders/buyer">
      <NavigationBarBuyer />
      <OrdersBuyer />
    </Route>
    <Route exact path="/map">
      <NavigationBarBuyer />
      <MapPage />
    </Route>
    <Route exact path="/cart">
      <NavigationBarBuyer />
      <ShoppingCart />
    </Route>
    <Route exact path="/profile/buyer">
      <NavigationBarBuyer />
      <ProfilePageBuyer user={user} handleUserUpdate={handleUserUpdate} logOut={logOut} />
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
      path="/orders/buyer/:eventID"
      exact={true}
      render={(props) => {
        return (
          <>
            <NavigationBarBuyer />
            <OrdersBuyerProducts {...props} />
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

export default Routes
