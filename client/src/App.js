import logo from "./logo.svg";
import "./App.css";
import "./webfontkit/stylesheet.css"
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import WhatIsOra from "./components/LandingPages/WhatIsOra/WhatIsOra";

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
        <Route
          exact path='/what-is-ora'
          component={WhatIsOra}
          />
      </div>
    );
  }
}
