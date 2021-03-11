import React from 'react'
import './SupportArtist.css'

export default function SupportArtist() {
  return (
    <div>
    <div id="wrapSupport">
    <div id="supportHeader">
        <div id="supportHeaderText">
        <h3>                            </h3>
        <h1>FOUR EXHIBITION PROJECTS SELECTED BY LEADING FIGURES OF THE ART WORLD</h1>
        <h2>DISCOVER OUR SELECTED PROJECTS AND BECOME A PATRON OF THE ARTS BY SUPPORTING THE PROJECT OF YOUR CHOICE THROUGH OUR INTEGRATED CROWDFUNDING TOOL</h2>
        <a href='/artist-open-call'><p>FIND OUT MORE ABOUT OUR ARTIST OPEN CALL +</p></a>
        </div>
        <a href="/contact-us" id="getInTouch"><button className="btnBlack">PARTICIPATE NOW</button></a>
  
    </div>
    <div id="allImages" className="animate__animated animate__fadeInUp">
    <div className="imageLine">
        <div id="image1" className="imageSupport">
            <div className="blurEffect">
            <h1 className="exhibTitle">THERAPY</h1>
            <p><span className="exhib">an exhibtion by </span> <span className ="artistName">MILES GREENBERG</span></p>
            </div>
        </div>
              <div id="image2" className="imageSupport">
                  <div className="blurEffect">
            <h1 className="exhibTitle">CONVERSIONS</h1>
            <p><span className="exhib">an exhibtion by </span> <span className ="artistName">TOM BURR</span></p>
                </div>
        </div>
    </div>
    <div className="imageLine">
        <div id="image3" className="imageSupport">
            <div className="blurEffect">
            <h1 className="exhibTitle">EXO-01</h1>
            <p><span className="exhib">an exhibtion by </span> <span className ="artistName">BRETT GINSBURG</span></p>
            </div>
       </div>
              <div id="image4" className="imageSupport">
                <div className="blurEffect">
            <h1 className="exhibTitle">CEREMONIUM</h1>
            <p><span className="exhib">an exhibtion by </span> <span className ="artistName">JESSE KANDA</span></p>
            </div>  
        </div>
    </div>
    </div>

</div>

      
    </div>
  )
}
