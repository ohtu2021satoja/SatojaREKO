import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../HomePage";
import ProfilePageBuyer from "../ProfilePageBuyer";
import Products from "../Products";

const Routes = ({ user, logOut }) => (
  <Switch>
    <Route exact path="/">
      <HomePage logOut={logOut} />
    </Route>
    <Route path="/add">Add</Route>
    <Route path="/products">
      <Products products={user.products} />
    </Route>
    <Route path="/orders">Orders</Route>
    <Route path="/profile">
      <ProfilePageBuyer user={user} />
    </Route>
    <Route>Not found</Route>
  </Switch>
);

export default Routes;
