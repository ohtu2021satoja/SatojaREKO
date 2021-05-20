import React from "react";
import Switch from "react-router-dom/Switch";
import Route from "react-router-dom/Route";
import LoginForm from "../LoginForm";
import Products from "../Products";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LoginForm}></Route>
    <Route path="/add">Add</Route>
    <Route path="/products" component={Products}></Route>
    <Route path="/orders">Orders</Route>
    <Route path="/profile">Profile</Route>
    <Route>Not found</Route>
  </Switch>
);

export default Routes;
