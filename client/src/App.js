import logo from "./logo.svg";
import "./App.css";
import "./webfontkit/stylesheet.css"
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import WhatIsOra from "./components/LandingPages/WhatIsOra/WhatIsOra";
import { Loggedin } from './services/auth';

export default class App extends Component {
  state = {
    user: null,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  async componentDidMount() {
    const currentUser = await Loggedin()
    this.setState({user: currentUser});
  }

  render() {

    return (
      <div className="App">
        {/* <Navbar user={this.state.user} setUser={this.setUser} /> */}
        <Navbar user={this.props.user}/>
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
