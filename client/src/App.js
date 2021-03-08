import "./App.css";
import "./webfontkit/stylesheet.css";
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WhatIsOra from "./components/LandingPages/WhatIsOra/WhatIsOra";
import GalleryProfile from './components/GalleryProfile/GalleryProfile';
import GalleryProfileHooks from './components/GalleryProfile/GalleryProfileHooks';
import ArtistsList from "./components/ArtistsList/ArtistsList";
import AddEditArtist from "./components/AddEditArtist/AddEditArtist";
import { Loggedin } from "./services/auth";
import HomePage from "./components/LandingPages/HomePage/HomePage";

import ArtistOpen from "./components/LandingPages/ArtistOpen/ArtistOpen";



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
    this.Loggedin().then((user) => {
      // console.log(user);
      this.setState({ user: user });
    });
    // console.log(currentUser);
    // this.setState({user: currentUser});
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/what-is-ora" component={WhatIsOra} />
          <Route
            exact
            path="/gallery/new"
            render={(props) => (
              <GalleryProfileHooks user={this.state.user} {...props} />
            )}
          />

          <Route exact path='/artist-open-call' component={ArtistOpen} />


        <Route exact path='/gallery/new' render={props => <GalleryProfileHooks user={this.state.user} {...props} />} />
        <Route exact path='/gallery/artists' render={props => <ArtistsList user={this.state.user} {...props} />} />
        <Route exact path='/gallery/add-artist' render={props => <AddEditArtist user={this.state.user} {...props} />} />
        <Route exact path='/gallery/profile' render={props => <GalleryProfileHooks setUser={this.setUser} user={this.state.user} {...props} />} />

       {/* <Route
          exact path='/login'
          render={props => <LogIn setUser={this.setUser} {...props} />}
          /> */}

        </Switch>
        <Footer />
      </div>
    );
  }
}
