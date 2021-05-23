import { Link } from "react-router-dom";
import {
  Card,
  IconButton,
  Input,
  CardHeader,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import SearchIcon from "@material-ui/icons/Search";
import "./home.css";

const HomeScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredinstagramPosts, setFilteredInstagramPosts] = useState([]);

  const addPost = post => {
    setInstagramPosts(instagramPosts => [...instagramPosts, post]);
  };

  const fetchPostData = id => {
    fetch(
      "https://graph.instagram.com/17895695668004550?fields=id,media_type,media_url,username,timestamp&access_token=YourAccessToken"
    ).then(() => {
      addPost({
        id: "17895695668004550" + Math.random(),
        media_type: "IMAGE",
        media_url: "https://fb-s-b-a.akamaihd.net/...",
        username: "jayposiris",
        timestamp: "2017-08-31T18:10:00+0000",
        caption: "lorem" + Math.random()
      });
    });
  };

  useEffect(() => {
    fetch(
      "https://graph.instagram.com/me/media?fields=id,caption&access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784"
    ).then(x => {
      [
        {
          id: "17895695668004550",
          caption: ""
        },
        {
          id: "17899305451014820",
          caption: ""
        },
        {
          id: "17896450804038745",
          caption: ""
        },
        {
          id: "17881042411086627",
          caption: ""
        }
      ].forEach(d => {
        fetchPostData(d.id);
      });
    });
  }, []);

  useEffect(() => {
    setFilteredInstagramPosts(
      instagramPosts.filter(post => post.caption.includes(searchValue))
    );
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
          <Card key={post.id} className="card">
            <CardHeader
              avatar={<img src={post.media_url} alt="" />}
              title={<p className="user-name">{post.username}</p>}
              subheader={post.timestamp}
            ></CardHeader>
            <CardContent>
              <CardMedia image={post.media_url} title="Paella dish" />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.caption}
                </Typography>
              </CardContent>
            </CardContent>
          </Card>
        ))}
      </main>
    </>
  );
};

export default HomeScreen;
