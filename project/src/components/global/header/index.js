import React from "react";
import { Link } from "react-router-dom"; // a elementi ile route degistirmedigimizden dolayı rrd den Link elementini cekiyoru
const Header = () => {
  return (
    <div className="ui secondary pointing menu ">
      <Link to="/" className="item">
        <i aria-hidden="true" className="paper plane large icon"></i>
        <p style={{ fontStyle: "oblique" }}>Mail Templates</p>
      </Link>
    </div>
  );
};

export default Header;
