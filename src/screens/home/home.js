import { Link } from "react-router-dom";
import {
  Card,
  IconButton,
  Input,
  CardHeader,
  CardContent,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import SearchIcon from "@material-ui/icons/Search";
import "./home.css";
import { get } from "../../api";

const HomeScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredinstagramPosts, setFilteredInstagramPosts] = useState([]);

  const addPost = post => {
    setInstagramPosts(instagramPosts => [...instagramPosts, post]);
  };

  const fetchPostData = (id, extra) => {
    get.mediaInfo(id).then(post => addPost({ ...post, ...extra }));
  };

  useEffect(() => {
    get.ids().then(response => {
      const postSummary = response.data;
      postSummary.forEach(d => {
        fetchPostData(d.id, { caption: d.caption });
      });
    });
  }, []);

  useEffect(() => {
    setFilteredInstagramPosts(
      instagramPosts.filter(post => post.caption.includes(searchValue))
    );
    console.log(instagramPosts);
  }, [searchValue, instagramPosts]);
  return (
    <>
      <Header
        right={
          <div className="header-right-home">
            <div className="search-box">
              <Input
                disableUnderline
                type="text"
                value={searchValue}
                onChange={e => {
                  setSearchValue(e.nativeEvent.target.value);
                }}
                placeholder="Search..."
              />
              <SearchIcon />
            </div>
            <IconButton
              className="menu-button"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <img
                src="https://avatars.githubusercontent.com/u/20256683?s=60&v=4"
                alt="Saransh Gupta"
              ></img>
              {showMenu && (
                <ul>
                  <li>
                    {" "}
                    <Link to="/profile">My Account</Link>
                  </li>
                  <li>Logout</li>
                </ul>
              )}
            </IconButton>
          </div>
        }
      ></Header>
      <main className="post-container">
        {filteredinstagramPosts.map(post => (
          <div>
            <Card key={post.id} className="card">
              <CardHeader
                avatar={<img src={post.userImage} className="avatar" alt="" />}
                title={<p className="user-name">{post.username}</p>}
                subheader={post.timestamp}
              ></CardHeader>
              <CardContent>
                <img src={post.media_url} alt="" />
                <hr />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {post.caption}
                  </Typography>
                </CardContent>
              </CardContent>
            </Card>
          </div>
        ))}
      </main>
    </>
  );
};

export default HomeScreen;
