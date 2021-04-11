import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./core/Home";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default Routes;