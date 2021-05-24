import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../HomePage";
import HomePageSeller from "../HomePageSeller";
import ProfilePageSeller from "../ProfilePageSeller";
import Products from "../Products";

const RoutesSeller = ({ user, logOut, setSellerView }) => (
  <Switch>
    <Route exact path="/">
      <HomePage logOut={logOut} setSellerView={setSellerView} />
    </Route>
    <Route exact path="/home">
      <HomePageSeller />
    </Route>
    <Route path="/add">Add</Route>
    <Route path="/products">
      <Products products={user.products} />
    </Route>
    <Route path="/orders">Orders</Route>
    <Route path="/profile">
      <ProfilePageSeller user={user} />
    </Route>
    <Route>Not found</Route>
  </Switch>
);

export default RoutesSeller;
