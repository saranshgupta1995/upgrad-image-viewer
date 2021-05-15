import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/">Image Viewer</Link>
      </h1>
    </header>
  );
};
export default Header;
