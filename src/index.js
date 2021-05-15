import React from "react";
import ReactDOM from "react-dom";
import "./styles/reset.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/login/login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <LoginScreen></LoginScreen>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(App(), document.getElementById("root"));
