import "./App.css";
import "./webfontkit/stylesheet.css"
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WhatIsOra from "./components/LandingPages/WhatIsOra/WhatIsOra";
import { Loggedin } from './services/auth';
import GalleryProfile from './components/GalleryProfile/GalleryProfile';
import GalleryProfileHooks from './components/GalleryProfile/GalleryProfileHooks';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.Loggedin = Loggedin.bind(this);
  }

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  componentDidMount() {
    this.Loggedin()
      .then(user => {
        // console.log(user);
        this.setState({user: user});
      })
    // console.log(currentUser);
    // this.setState({user: currentUser});
  }

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
        <Route exact path='/gallery/new' render={props => <GalleryProfileHooks user={this.state.user} {...props} />} />
      </div>
    );
  }
}
