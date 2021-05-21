import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "../HomePage";
import LoginPage from "../LoginPage";
import ProfilePageBuyer from "../ProfilePageBuyer";
import Products from "../Products";

const Routes = ({ user, handleLogin }) => (
  <Switch>
    <Route exact path="/">
      {user ? <HomePage /> : <LoginPage handleLogin={handleLogin} />} 
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
