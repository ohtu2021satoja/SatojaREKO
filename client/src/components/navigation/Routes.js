import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import ProfilePageBuyer from "../ProfilePageBuyer";
import Products from "../Products";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route path="/add">Add</Route>
    <Route path="/products" component={Products}></Route>
    <Route path="/orders">Orders</Route>
    <Route path="/profile" component={ProfilePageBuyer} />
    <Route>Not found</Route>
  </Switch>
);

export default Routes;
