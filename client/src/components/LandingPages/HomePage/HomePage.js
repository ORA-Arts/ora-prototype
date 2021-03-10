import React from "react";
import './HomePage.css'
import '../../../App.css'

export default function HomePage() {
  return (
    <div>
        <div id="allImagesContainer" className="animate__animated animate__fadeInUp" >
          <a href="/artist-open-call">
            <div className="imageContainer" id="imageLeft">
              <div className="blurEffectHP">
                <h2 className="textBlack" id="textLeft">
                  ARTIST OPEN CALL
                </h2>
                <div id='AOC'>
                  <h3 className="textHover textBlack">
                    CREATORS OF ALL AGES, CAREER BRACKETS AND GEOGRAPHIES ARE
                    WELCOME TO APPLY TO OUR OPEN CALL
                </h3>
                <button className="btnBlack btnHP" id="btnAOC">LEARN MORE</button>
                </div>
              </div>
            </div>
          </a>
          <a href="/collector-space">
            <div className="imageContainer" id="imageMiddle">
              <div className="blurEffectHP">
                <h2 className="textWhite" id="textMiddle">
                  COLLECTOR SPACE
                </h2>
                <div id='CS'>
                <h3 className="textHover textWhite">
                  YOUR NEW WAY OF COLLECTING AND SUPPORTING CONTEMPORARY ART
                </h3>
                <button className="btnWhite btnHP" id='btnCS'>DISCOVER</button>
                </div>
              </div>
            </div>
          </a>
          <a href="/support-an-artist-project">
            <div className="imageContainer" id="imageRight">
              <div className="blurEffectHP">
                <h2 className="textWhite" id="textRight">
                  SUPPORT AN ARTIST PROJECT
                </h2>
                <div id='SAAP'>
                <h3 className="textHover textWhite">
                  FOUR EXHIBITION PROJECTS SELECTED BY LEADING FIGURES OF THE
                  ART WORLD
                </h3>
                <button className="btnWhite btnHP" id='btnSAAP'>CONTRIBUTE</button>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
  );
}
