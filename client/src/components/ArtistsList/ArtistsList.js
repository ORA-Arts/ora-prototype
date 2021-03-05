import React, { Component } from 'react'
import './ArtistsList.css'
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import Link from 'react-dom'

export default class ArtistsList extends Component {
  constructor(props) {
    super(props);
    // replace by props. if the gallery information exist
    this.state = {
      artists: [],
    };
    //this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  componentDidMount() {
    const artists = [{ name: 'Kai Althoff'}, { name: 'Cosima von Bonin' }]
    this.setState({
      artists: artists
    })
  }
  render() {
    return (
      <div className='myArtists'>
        <ProfileSideBar content="my-artists" />
        <div>
          <div className='myArtistsHeader'>
          <hr />
            <h3>REPRESENTED ARTISTS OR WORKS AVAILABLE BY</h3>
            {/* <div className='line'></div> */}
          </div>
          <div className='artistsList'>
            {this.state.artists.map(artist => {
              return (
                <Link to={{pathname:`/artists/${artist._id}`}}>
                <a className='btnWhite'>
                  {artist.name}
                </a>
                // </Link>
              )
            })}
          </div>
          <div className='myArtistsHeader'>
          <hr />
          <h3>ADD AN ARTIST</h3>
            {/* <div className='line'></div> */}
          </div>
          
          <div className='addArtist'>
            <h4>GALLERY BIOGRAPHY</h4>
            <article>
              <p> We are happy to assist you in adding a new artist to your program, name of the gallery ! </p>
              <p>Please, note that all required fields will need to be completed on your end. Once validated by ORA, we will publish the artist page officially onto ORA’s artist glossary and to your gallery page, in ORA’s gallery network. You’ll be able to manage your artist’s data, private sales and advisory requests as well as inventory directly from your interface.</p>
              <p> You can complete your artist’s profile all at once or start now and save your changes for later validation ! </p>
              <p>If you have any questions, please contact our support team. </p>
              <a className='btnBlack'> ADD AN ARTIST + </a>
            </article>
          </div>
        </div>
      </div>
    )
  }
}
