import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../common/Header";
import "./profile.css";
import { IconButton } from "@material-ui/core";

const ProfileScreen = withRouter(({ history }) => {
  return (
    <>
      <Header
        right={
          <div className="header-right-home">
            <IconButton>
              <img
                src="https://avatars.githubusercontent.com/u/20256683?s=60&v=4"
                alt="Saransh Gupta"
              ></img>
            </IconButton>
          </div>
        }
      ></Header>
      <main className="home-main"></main>
    </>
  );
});

export default ProfileScreen;
