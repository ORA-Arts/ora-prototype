import "./App.css";
import "./webfontkit/stylesheet.css";

import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WhatIsOra from "./components/LandingPages/WhatIsOra/WhatIsOra";

import GalleryProfileHooks from './components/GalleryProfile/GalleryProfileHooks';
import ArtistsListHooks from "./components/ArtistsList/ArtistsListHooks"; 
import ArtistProfileHooks from "./components/ArtistProfile/ArtistProfileHooks";
import HomePage from "./components/LandingPages/HomePage/HomePage";
import InventoryList from "./components/Inventory/InventoryList";
import AddNewArtWork from "./components/Inventory/AddNewArtWork";
import ArtistOpen from "./components/LandingPages/ArtistOpen/ArtistOpen";
import CollectorSpace from './components/LandingPages/CollectorSpace/CollectorSpace';
import CollectorProfile from './components/CollectorProfile/CollectorProfile';

import { Loggedin } from './services/auth';
import { fetchGalleryName } from './api/service';
import { fetchCollectorName } from './api/service'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      galleryName: "",
      collectorName: ''
    };
    this.Loggedin = Loggedin.bind(this);
    this.fetchGalleryName = fetchGalleryName.bind(this);
    this.fetchCollectorName = fetchCollectorName.bind(this);
    this.changeGalleryName = this.changeGalleryName.bind(this);
    this.changeCollectorName = this.changeCollectorName.bind(this);
  }

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  changeGalleryName = (newName) => {
    console.log(newName);
    this.setState({ galleryName: newName });
  }


  changeCollectorName = (newName) => {
    console.log(newName);
    this.setState({ collectorName: newName });
  }

  componentDidMount() {
    this.Loggedin().then((user) => {
      // console.log(user);
      this.setState({ user: user });
    });
    this.fetchGalleryName().then(galleryName => {
      this.setState({ galleryName: galleryName });
    });
    this.fetchCollectorName().then(collectorName => {
      this.setState({ collectorName: collectorName });
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
          <Route exact path='/collector-space' component={CollectorSpace} />
          <Route exact path='/gallery/profile' render={props => <GalleryProfileHooks setUser={this.setUser} changeGalleryName={this.changeGalleryName} user={this.state.user} {...props} />} />
          <Route exact path='/gallery/artists' render={props => <ArtistsListHooks setUser={this.setUser} galleryName={this.state.galleryName} user={this.state.user} {...props} />} />
          <Route exact path='/gallery/artists/new' render={props => <ArtistProfileHooks isViewMode={false} setUser={this.setUser} galleryName={this.state.galleryName} user={this.state.user} {...props} />} />
          <Route exact path='/gallery/artists/:id' render={props => <ArtistProfileHooks isViewMode={true} setUser={this.setUser} galleryName={this.state.galleryName} user={this.state.user} {...props} />} />
          <Route exact path='/gallery/inventory' render={props => <InventoryList setUser={this.setUser} user={this.state.user} galleryName={this.state.galleryName} {...props} />} />
          <Route exact path='/gallery/inventory/new' render={props => <AddNewArtWork isViewMode={false} setUser={this.setUser} galleryName={this.state.galleryName} user={this.state.user} {...props} />} />
          <Route exact path='/gallery/inventory/:id' render={props => <AddNewArtWork isViewMode={true} setUser={this.setUser} galleryName={this.state.galleryName} user={this.state.user} {...props} />} />
          <Route exact path='/collector/profile' render={props => <CollectorProfile setUser={this.setUser} changeCollectorName={this.changeCollectorName} user={this.state.user} {...props} />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}