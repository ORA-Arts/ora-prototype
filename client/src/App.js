import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";

export default class App extends Component {
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };
  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
      </div>
    );
  }
}
