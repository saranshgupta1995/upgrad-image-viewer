import { Link } from "react-router-dom";
import {
  Card,
  IconButton,
  Input,
  CardHeader,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Button
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import SearchIcon from "@material-ui/icons/Search";
import FavouriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./home.css";
import { get } from "../../api";
import { format } from "../../utils";

const HomeScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredinstagramPosts, setFilteredInstagramPosts] = useState([]);

  const addPost = post => {
    setInstagramPosts(instagramPosts => [...instagramPosts, post]);
  };

  const likePost = (id, status) => {
    setInstagramPosts(instagramPosts =>
      instagramPosts.map(post => {
        if (post.id === id) {
          post.liked = status;
        }
        return post;
      })
    );
  };

  const fetchPostData = (id, extra) => {
    get.mediaInfo(id).then(post => addPost({ ...post, ...extra }));
  };

  useEffect(() => {
    get.ids().then(response => {
      const postSummary = response.data;
      postSummary.forEach(d => {
        fetchPostData(d.id, {
          caption: d.caption,
          hashtags: ["Upgrad", "Learning"],
          likes: 7,
          liked: false
        });
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
          <div key={post.id}>
            <Card key={post.id} className="card">
              <CardHeader
                avatar={<img src={post.userImage} className="avatar" alt="" />}
                title={<p className="user-name">{post.username}</p>}
                subheader={format(new Date(post.timestamp), "DD/MM/YYYY HH:mm:SS")}
              ></CardHeader>
              <CardContent>
                <img src={post.media_url} alt="" />
                <hr />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className="caption"
                  >
                    {post.caption}
                  </Typography>
                  {!!post.hashtags.length && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className="hashtags"
                    >
                      {post.hashtags.map(tag => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </Typography>
                  )}
                  <br />
                  <div className="likes">
                    {post.liked ? (
                      <FavoriteIcon
                        onClick={() => likePost(post.id, !post.liked)}
                        className={"liked"}
                      ></FavoriteIcon>
                    ) : (
                      <FavouriteBorderIcon
                        onClick={() => likePost(post.id, !post.liked)}
                      ></FavouriteBorderIcon>
                    )}
                    <span>
                      {" "}
                      <span>{post.likes + (post.liked ? 1 : 0)}</span> likes
                    </span>
                    <br />
                  </div>
                  <div className="comment-box">
                    <FormControl className="form-control">
                      <InputLabel htmlFor="username">Add a comment</InputLabel>
                      <Input id="username" aria-describedby="my-helper-text" />
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                      ADD
                    </Button>
                  </div>
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
