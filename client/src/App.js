import logo from "./logo.svg";
import "./App.css";
import "./webfontkit/stylesheet.css"
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
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
        {/* <Navbar user={this.state.user} setUser={this.setUser} /> */}
        <Navbar />
        <Footer />
        <Route
          exact path='/what-is-ora'
          component={WhatIsOra}
          />
        <Route
          exact path='/signup'
          render={props => <SignUp setUser={this.setUser} {...props} />}
          />
       {/* <Route
          exact path='/login'
          render={props => <LogIn setUser={this.setUser} {...props} />}
          /> */}
      </div>
    );
  }
}
