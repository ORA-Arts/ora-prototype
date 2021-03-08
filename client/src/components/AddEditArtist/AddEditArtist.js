import './AddEditArtist.css'
import React, { Component } from 'react'
import ProfileSideBar from "../ProfileSideBar/ProfileSideBar";
import artistImage from './artist.jpg'

export default class AddEditArtist extends Component {
  constructor(props) {
    super(props);
    // replace by props. if the gallery information exist
    this.state = {
      _id: '',
      galleryId: '',
      name: '',
      birthYear: 0,
      birthPlace: '',
      image: artistImage,
      caption: '',
      medium: [],
      relationship: [],
      meta_data: '',
      artwork_min: 0,
      artwork_max: 0,
      editions_min: 0,
      editions_max: 0,
      artistBiography: '',
      mainQuote: '',
    };
  }
  onChangeHandler(event) {
    let { name, value } = event.target;
    console.log(name, value);
    if (name === "convelio") {
      value = value === "YES";
    } else {
      value = value.toUpperCase();
    }
    // this.setState(() => ({
    //   [name]: value
    // }));
  }
  componentDidMount() {
    this.setState({
      _id: '23456784741LKIJSHJ',
      galleryId: '23456784741LKIJSHJ',
      name: 'Kai Althoff',
      birthYear: 1976,
      birthPlace: 'Paris',
      image: artistImage,
      caption: '',
      medium: ['Sculpture', 'Photography'],
      relationship: ['works available'],
      meta_data: 'photography',
      artwork_min: 5,
      artwork_max: 15,
      editions_min: 3,
      editions_max: 16,
      artistBiography: `Galerie Neu was founded in 1994 by Alexander Schroeder and Thilo Wermke in Berlin's Mitte district. Their focus was initially on Berlin's young and dynamic art scene; Neu exhibited then-emerging artists such as Kai Althoff, Daniel Pflumm, Manfred Pernice, Josephine Pryde and Andreas Slominski, all of whom continue to show with the gallery and have gone on to gain international recognition.
        
        Since the late 1990s Neu has broadened the scope of its activities and now represents 32 artists, among them early- and mid-career ones (such as Jana Euler, Karl Holmqvist, Sergej Jensen, Kitty Kraus, Klara Lidén and Victor Man) as well as others whose oeuvre now spans several decades (Marc Camille Chaimowicz, Manfred Pernice, Cosima von Bonin and Cerith Wyn Evans).
        
        In 2014, Galerie Neu relocated to a new address in Mitte, where it expanded its programme with exhibitions by Merlin Carpenter, Anne Collier, Yngve Holen, Alex Hubbard, Jill Mulleady and Reena Spaulings.
        
        The gallery’s artists have been included in exhibitions such as the Venice Biennial, documenta and Skulptur Projekte Muenster, and are regularly selected for international institutional shows. Galerie Neu has participated in all major international art fairs.
       `,
      mainQuote:

        `Galerie Neu was founded in 1994 by Alexander Schroeder and Thilo Wermke in Berlin's Mitte district. Their focus was initially on Berlin's young and dynamic art scene; Neu exhibited then-emerging artists such as Kai Althoff, Daniel Pflumm, Manfred Pernice, Josephine Pryde and Andreas Slominski, all of whom continue to show with the gallery and have gone on to gain international recognition.
        `,
    })
  }
  render() {
    return (
      <div className='myArtists'>
        <ProfileSideBar content="my-artists" />
        <div className='artistsContainer'>
          <div className='myArtistsHeader'>
            <hr />
            <span className='subtitle'>ARTIST INFORMATION</span>
            {/* <div className='line'></div> */}
          </div>
          <div className='artistsInfo'>
            <div className='topInfo'>
              <div className='left'>
                {/* replace input by real information later */}
                <div className="artist-input">
                  <span className="inputLabel">NAME/ </span>
                  <input type="text" name="name" onChange={this.onChangeHandler} value={this.state.name} className="inputClear name" placeholder="THOMAS BALLOT" ></input>
                </div>
                <div className="artist-input">
                  <span className="inputLabel">BIRTH YEAR/ </span>
                  <input type="text" name="birthYear" onChange={this.onChangeHandler} value={this.state.birthYear} className="inputClear year" placeholder="1989"></input>
                </div>
                <div className="artist-input">
                  <span className="inputLabel">BIRTH PLACE/ </span>
                  <input type="text" name="birthPlace" onChange={this.onChangeHandler} value={this.state.birthPlace} className="inputClear city" placeholder="Berlin"></input>
                </div>
              </div>
              <div className='right'>
                <button className="btn-change">CHANGE IMAGE</button>
                <div className="image-container">
                  <img className="artist-image" src={this.state.image} alt="gallery house" />
                  {/* Upload image here */}
                </div>
              </div>
            </div>
            <div className='middleInfo'>
              <div className="medium-input">
                <span className="inputLabel">MEDIUM/ </span>
                <input type="text" name="medium" onChange={this.onChangeHandler} value={this.state.medium} className="inputClear medium" placeholder="Medium"></input>
              </div>
              <div className="medium-input">
                <span className="inputLabel">RELATIONSHIP WITH THE GALLERY/ </span>
                <input type="text" name="relationship" onChange={this.onChangeHandler} value={this.state.relationship} className="inputClear medium" placeholder="Represented By / Works available by"></input>
              </div>
              <div className="medium-input">
                <span className="inputLabel">KEYWORDS/ </span>
                <input type="text" name="meta_data" onChange={this.onChangeHandler} value={this.state.meta_data} className="inputClear medium" placeholder="Keywords"></input>
              </div>
            </div>
            <div className='topInfo'>
              <div className='left'>
                <div className="artist-input">
                  <span className="inputLabel">UNIQUE ARTWORKS PRICE RANGE/ </span>
                  <input type="text" name="artwork_min" onChange={this.onChangeHandler} value={this.state.artwork_min + 'K'} className="inputClear min" placeholder="3"></input> -
                  <input type="text" name="artwork_max" onChange={this.onChangeHandler} value={this.state.artwork_max + 'K'} className="inputClear min" placeholder="3"></input>
                </div>
              </div>
              <div className='right'>
                <div className="artist-input">
                  <span className="inputLabel">UNIQUE ARTWORKS PRICE RANGE/ </span>
                  <input type="text" name="editions_min" onChange={this.onChangeHandler} value={this.state.editions_min + 'K'} className="inputClear min" placeholder="3"></input> -
                  <input type="text" name="editions_max" onChange={this.onChangeHandler} value={this.state.editions_max + 'K'} className="inputClear min" placeholder="3"></input>
                </div>
              </div>
            </div>
          </div>
          <div className='myArtistsHeader'>
            <hr />
            <span className='subtitle'>BIOGRAPHY, EXHIBITION, PRESS</span>
            {/* <div className='line'></div> */}
          </div>

          <div className='addArtist'>
            <h4>ARTIST BIOGRAPHY</h4>
            <textarea name="artistBiography" onChange={this.onChangeHandler} value={this.state.artistBiography} id="biography" className="biography-text" rows="15" placeholder="your gallery biography"></textarea>

          </div>
          <div className='addArtist'>
            <h4>MAIN QUOTE</h4>
            <textarea name="mainQuote" onChange={this.onChangeHandler} value={this.state.mainQuote} id="biography" className="biography-text" rows="5" placeholder="your gallery biography"></textarea>
          </div>
          <button className='btnBlack'> SAVE ARTIST </button>
        </div>
      </div>
    )
  }
}
