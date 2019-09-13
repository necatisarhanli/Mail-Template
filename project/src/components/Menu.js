import React from "react";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="ui three cards">
      <Link
        to="/templates/use"
        onClick={() => {
          console.log("deneme");
        }}
        className="ui blue  card"
      >
        <div className="content">
          <div className="header">New Mail</div>
        </div>
      </Link>
      <Link to="/" className="ui green  card">
        <div className="content">
          <div className="header">Load Default Templates</div>
        </div>
      </Link>
      <Link to="/templates/new" className="ui red  card">
        <div className="content">
          <div className="header">Create New Template</div>
        </div>
      </Link>
    </div>
  );
};

export default Menu;
