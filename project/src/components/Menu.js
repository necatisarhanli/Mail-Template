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
        className="ui blue fluid card"
      >
        <div className="content">
          <div className="header">New Mail</div>
        </div>
      </Link>
      <Link to="/" className="ui green fluid card">
        <div className="content">
          <div className="header">Load Default templates</div>
        </div>
      </Link>
      <Link to="/templates/new" className="ui red fluid card">
        <div className="content">
          <div className="header">Create New Template</div>
        </div>
      </Link>
    </div>
  );
};

export default Menu;
