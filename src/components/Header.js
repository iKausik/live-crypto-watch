import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">
        <p className="title">LIVE CRYPTO WATCH</p>
      </Link>
    </div>
  );
};

export default Header;
