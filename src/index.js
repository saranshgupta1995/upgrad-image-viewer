import React from "react";
import ReactDOM from "react-dom";
import "./styles/reset.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/login/login";
import HomeScreen from "./screens/home/home";
import ProfileScreen from "./screens/profile/profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <HomeScreen></HomeScreen>
          </Route>
          <Route path="/profile">
            <ProfileScreen></ProfileScreen>
          </Route>
          <Route path="/">
            <LoginScreen></LoginScreen>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(App(), document.getElementById("root"));
