import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LoginPage}></Route>
    <Route path="/add">Add</Route>
    <Route path="/products">Products</Route>
    <Route path="/orders">Orders</Route>
    <Route path="/profile">Profile</Route>
    <Route>Not found</Route>
  </Switch>
);

export default Routes;
