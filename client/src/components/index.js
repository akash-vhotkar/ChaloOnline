import React, { Component } from "react";
import { Link } from "react-router-dom";
class inx extends Component {
  render() {
    return (
      <div className="inx">
        <h2>Home Page</h2>
        <div>
          <Link to="/login" id="inxlog">
            Login Here
          </Link>
          <Link to="/register" id="inxreg">
            Not registered yet
          </Link>
        </div>
      </div>
    );
  }
}
export default inx;
