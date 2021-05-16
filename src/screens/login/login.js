import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  FormControl,
  InputLabel,
  Button,
  Input,
  FormHelperText
} from "@material-ui/core";
import Header from "../../common/Header";
import "./login.css";

const LoginScreen = ({ history }) => {
  const [usernameFilled, setUsernameFilled] = useState(true);
  const [passwordFilled, setPasswordFilled] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  return (
    <>
      <Header></Header>
      <main className="home-main">
        <Card className="login-card">
          <form
            onSubmit={e => {
              e.preventDefault();
              setPasswordFilled(!!password);
              setUsernameFilled(!!username);
              if (username && password) {
                if (username === "admin" && password === "admin") {
                  history.push("/home");
                } else {
                  setIncorrectCredentials(true);
                }
              }
            }}
          >
            <h1>Login</h1>
            <FormControl className="form-control">
              <InputLabel htmlFor="username">
                Username <span>*</span>
              </InputLabel>
              <Input
                id="username"
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                  setIncorrectCredentials(false);
                }}
                aria-describedby="my-helper-text"
              />
              {!usernameFilled && (
                <FormHelperText error={true} id="my-helper-text">
                  required
                </FormHelperText>
              )}
            </FormControl>
            <FormControl className="form-control">
              <InputLabel htmlFor="password">
                Password <span>*</span>
              </InputLabel>
              <Input
                onChange={e => {
                  setPassword(e.target.value);
                  setIncorrectCredentials(false);
                }}
                id="password"
                value={password}
                aria-describedby="my-helper-text"
                type="password"
              />
              {!passwordFilled && (
                <FormHelperText error={true} id="my-helper-text">
                  required
                </FormHelperText>
              )}
            </FormControl>
            {incorrectCredentials && (
              <p className="help-text">Incorrect username and/or password</p>
            )}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        </Card>
      </main>
    </>
  );
};

export default withRouter(LoginScreen);
