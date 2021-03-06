import React from "react";
import whatIsOra1 from "../../../images/WHAT IS ORA.jpg";
import whatIsOra2 from "../../../images/WHAT IS ORA 2.jpg";
import whatIsOra3 from "../../../images/WHAT IS ORA .png";
import "./WhatIsOra.css";
import "../../../App.css";

export default function WhatIsOra() {
  return (
    <div>
      <div id="wrapWIO">
        <div id="zero">
          <div id="textTopAbout">
            <h1>
              {" "}
              ORA is the only platform connecting artists, curators,
              institutions, <br />
              galleries and collectors around{" "}
              <span style={{ fontFamily: "akzidenz-grotesk_probold" }}>
                {" "}
                A cooperative SYSTEM.
              </span>
            </h1>
            <h2>
              Our vision is to build a circular economy for the art world, with
              artists at its center.
            </h2>
          </div>
          <button className="btnBlack">GET IN TOUCH FOR MORE INFOS</button>
        </div>
        <div id="section123">
          <section className="aboutSection" id="one">
            <div className="sideClass">
              <div className="sideSelector" id="side1">
                <div className="numberAndText">
                  <p className="numberActivated">
                    <a href="#one">1</a>
                  </p>
                  <h1 className="textActivated">
                    ARTISTS, CURATORS <br />& INSTITUTIONS
                  </h1>
                </div>
                <div className="numberAndText">
                  <p className="numberNotActivated">
                    <a href="#two">2</a>
                  </p>
                  <h1 className="textNotActivated">GALLERIES & COLLECTORS</h1>
                </div>
                <div className="numberAndText" className="lastElement">
                  <p className="numberNotActivated">
                    <a href="#three">3</a>
                  </p>
                  <h1 className="textNotActivated">A CIRCULAR ECONOMY</h1>
                </div>
              </div>
              <img src={whatIsOra1} />
              </div>
              <div className="textSection">
                <h1>
                  ORA is a not-for-profit <br /> collaborative incubator
                  accessible <br /> to artists AND curators{" "}
                </h1>
                <p>
                  {" "}
                  Our mission is to support contemporary creation. <br /> <br />{" "}
                  We provide artists, curators and institutions with
                  opportunities <br /> <br /> in production, diffusion and
                  sales.{" "}
                </p>
                <a href="/artist-open-call">
                  <br />+ Visit our artist open call to find out more.
                </a>
              </div>
            
          </section>
          <hr></hr>
          {/*  <section className="aboutSection" id="two">
            <div className="sideclass">
                <div className="sideSelector" id="side1">
                    <div className="numberAndText">
                        <p className="numberNotActivated"><a href="#one">1</a></p>
                        <h1 className="textNotActivated">ARTISTS, CURATORS <br/>& INSTITUTIONS </h1>
                    </div>
                    <div className="numberAndText">
                        <p className="numberActivated"><a href="#two">2</a></p>
                        <h1 className="textActivated">GALLERIES & COLLECTORS</h1>
                    </div>
                    <div className="numberAndText" className="lastElement">
                        <p className="numberNotActivated"><a href="#three">3</a></p>
                        <h1 className="textNotActivated">A CIRCULAR ECONOMY</h1>
                    </div>
                </div>
                <img src={whatIsOra2} />
            </div>
            <div className="textSection">
                <h1>To reinforce our support, ORA <br/> invites galleries and collectors <br/> to collaborate</h1>
                <p> While galleries and collectors can contribute to ORA’s incubator’s activities, <br/> <br/> they also
                    gain access to our free digital portal : <br/> <br/> ORA’s collector space is a curated, transparent
                    and secure end-to-end sales <br/> <br/> solution. It provides all types of collectors a simple way to
                    connect with an international  <br/> <br/> audience of contemporary art galleries for private artwork
                    acquisitions. </p>
                <a href="/collector-space"><br/>+ Visit our collector space to find out more.</a>
            </div>
        </section>
        <hr></hr>
        <section id="three" className="aboutSection">
            <div className="sideclass">
                <div className="sideSelector" id="side1">
                    <div className="numberAndText">
                        <p className="numberNotActivated"><a href="#one">1</a></p>
                        <h1 className="textNotActivated">ARTISTS, CURATORS <br/>& INSTITUTIONS</h1>
                    </div>
                    <div className="numberAndText">
                        <p className="numberNotActivated"><a href="#two">2</a></p>
                        <h1 className="textNotActivated">GALLERIES & COLLECTORS</h1>
                    </div>
                    <div className="numberAndText" className="lastElement">
                        <p className="numberActivated"><a href="#three">3</a></p>
                        <h1 className="textActivated">A CIRCULAR ECONOMY</h1>
                    </div>
                </div>
                <img src={whatIsOra3} />
            </div>
            <div className="textSection">
                <h1>ORA is based on a circular business<br/> model which carries positive <br/> social impact </h1>
                <p> We stand for a new type of business model : profits from our commercial <br/> <br/> activities are
                    reinvested into our not-for-profit’s production capital. These <br/> <br/> funds are made available
                    for artists to implement their projects. <br/><br/><br/> In this way, whether you are an artist, a
                    curator, an institution, a gallery or a collector, <br/> <br/>any action you carry out through ORA
                    directly supports artistic creation. </p>
                <a href="/artist-open-call"><br/>+ Visit our artist open call to find out more.</a>
            </div>
        </section> */}
        </div>
      </div>
      //{" "}
    </div>
  );
}
