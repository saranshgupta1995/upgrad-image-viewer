import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import SearchIcon from "@material-ui/icons/Search";
import "./home.css";
import { Input } from "@material-ui/core";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      "https://graph.instagram.com/me/media?fields=id,caption&access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784"
    ).then(x => {
      setData([
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
      ]);
    });
  }, []);
  return (
    <>
      <Header
        right={
          <div>
            <div className="search-box">
              <Input type="text" placeholder="Search..." />
              <SearchIcon />
            </div>
          </div>
        }
      ></Header>
    </>
  );
};

export default HomeScreen;
