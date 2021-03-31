import React, { Component } from "react";
import { Link } from "react-router-dom";

class admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      email: "",
      password: "",
    };

    this.update = this.update.bind(this);

    this.displayLogin = this.displayLogin.bind(this);
  }

  update(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  displayLogin(e) {
    e.preventDefault();
    console.log("You have successfully registered");
    console.log(this.state);
    this.setState({
      fullname: "",
      email: "",
      password: "",
    });
  }

  render() {
    return (
      <div id="parent">
        <div id="header">
          <img src></img>
        </div>
        <div className="register">
          <form onSubmit={this.displayLogin}>
            <h2>USER REGISTRATION</h2>
            <h3>WELCOME ABROAD</h3>

            <div className="name">
              <input
                type="text"
                placeholder="Name"
                name="fullname"
                value={this.state.fullname}
                onChange={this.update}
              />
            </div>

            <div className="email">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.update}
              />
            </div>

            <div className="pasword">
              <input
                type="password"
                placeholder="Mobile No"
                name="mobileno"
                value={this.state.password}
                onChange={this.update}
              />
            </div>

            <div className="password">
              <input
                type="password"
                placeholder="Sponser ID"
                name="sponserID"
              />
            </div>
            <div className="password">
              <input type="text" placeholder="Sponser Name" name="sponserID" />
            </div>

            <input className="reg" type="submit" value="Register" />
          </form>
          <Link to="/login" id="regli">
            Login Here
          </Link>
        </div>
      </div>
    );
  }
}
export default admin;
