import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Header from "../../common/Header";
import "./profile.css";
import { IconButton } from "@material-ui/core";
import { get } from "../../api";

const ProfileScreen = withRouter(({ history }) => {
  const [userData, setUserData] = useState(null);
  const [userPicture, setUserPicture] = useState(null);
  const [userPostCount, setUserPostCount] = useState(null);
  const [userUsersFollowed, setUserUsersFollowed] = useState(null);
  const [userUsersFollowedBy, setUserUsersFollowedBy] = useState(null);
  const [userUsersFullName, setUserUsersFullName] = useState(null);
  useEffect(() => {
    get.ids().then(data => {
      console.log(data);
      setUserData(data);
      setUserPicture(data.userImage);
      setUserPostCount(data.countPosts);
      setUserUsersFollowed(data.usersFollowed);
      setUserUsersFollowedBy(data.usersFollowedBy);
      setUserUsersFullName(data.fullName);
    });
  }, []);
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
      {userData && (
        <main className="profile-main">
          <div className="information-section">
            <img src={userPicture} alt="" />
            <div className="text-info">
              <h2>{userUsersFullName}</h2>
              <div>
                <span>Posts: {userPostCount}</span>
                <span>Follows: {userUsersFollowed}</span>
                <span>Followed By: {userUsersFollowedBy}</span>
              </div>
              <p>{userUsersFullName}</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
});

export default ProfileScreen;
