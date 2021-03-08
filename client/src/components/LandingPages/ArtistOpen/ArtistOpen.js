import React from 'react'
import img1 from '../../../images/ARTIST OPEN CALL.jpg'
import img2 from '../../../images/ARTIST OPEN CALL 2.jpg'
import './ArtistOpen.css'

export default function ArtistOpen() {
  return (
<div className="">
    <div id="artistHeader">
        <h1>CREATORS OF ALL AGES, CAREER BRACKETS AND GEOGRAPHIES ARE WELCOME TO APPLY TO OUR OPEN CALL</h1>
        <a href="/contact-us" id="getInTouch"><button className="btnBlack">GET IN TOUCH FOR MORE INFOS</button></a>
    </div>
    <div id="artistAllSections" className="animate__animated animate__fadeInUp">
        <hr></hr>
        <h1>MANIFESTO</h1>
        <hr></hr>
        <div id="artistSection1">
            <div id="textHeaderArtist">
                <p>In many ways, artists create prisms. Through their work, they each share with us their singular
                    outlook on
                    our world, thereby stimulating our own imagination and in turn uniting us around collective
                    representations.
                    ​In the globalised and interconnected era in which we find ourselves, we are more than ever aware of
                    the
                    plurality of these perspectives. Almost paradoxically, our increased access to these myriad cultural
                    productions also reminds us of the universality of human experience, however multifaceted it may be.
                    ORA’ support to production and diffusion aims to embody our contemporary era to every creative
                    medium,
                    beyond visual arts : creators of all ages, career brackets, and geographies are welcome to apply to
                    our open
                    call. Creators are welcome to submit ambitious ideas and to discuss them with our team.
                </p>
            </div>
            <img src={img1}/>
        </div>
        <div id="artistSection2">
            <div>
            <hr></hr>
                <h1>SELECTION PROCESS</h1>
            <hr></hr>
            </div>
            <div id="textSelection">
            <p>Once submitted, projects are selected by our expert committee, composed of international
                    personalities from the Art World and reunited in ORA’s not-for-profit</p>
            </div>
            <div className="lineComity">
                <div className="memberComity">
                    <h2 className="numberActivated">1</h2>
                    <h1>MYRIAM BEN SALAH</h1>
                    <p>Editor-at-large of Kaleidoscope Magazine and Executive Director of the Renaissance Society at the
                        University of Chicago</p>
                </div>
                <div className="memberComity">
                    <h2 className="numberActivated">2</h2>
                    <h1>CAROLINE BOURGEOIS</h1>
                    <p>Head Curator of the Pinault Collection, Paris</p>
                </div>
                <div className="memberComity">
                    <h2 className="numberActivated">3</h2>
                    <h1>SIMON CASTETS</h1>
                    <p>Director of the Swiss Institute, New York</p>
                </div>
                <div className="memberComity">
                    <h2 className="numberActivated">4</h2>
                    <h1>CATHERINE DAVID</h1>
                    <p>Deputy Director of the Musée national d'art moderne - Centre Pompidou, Paris</p>
                </div>
                <div className="memberComity">
                    <h2 className="numberActivated">5</h2>
                    <h1>RONAN GROSSIAT</h1>
                    <p>Collector, Head of the « Emergence » programme at the ADIAF (Association of the International
                        Diffusion of French Art)</p>
                </div>
            </div>
            <div className="lineComity">
                <div className="memberComity">
                    <h2 className="numberActivated">6</h2>
                    <h1>YUKO HASEGAWA</h1>
                    <p>Artistic Director of the Museum of Contemporary Art, Tokyo</p>
                </div>
                <div className="memberComity">
                    <h2 className="numberActivated">7</h2>
                    <h1>MARTHA KIRSZENBAUM</h1>
                    <p>Curator of the French Pavilion of the 58th Venice Biennale</p>
                </div>
                <div className="memberComity">
                    <h2 className="numberActivated">8</h2>
                    <h1>LAURENT LE BON</h1>
                    <p>Director of the Musée Picasso, Paris</p>
                </div>
                <div className="memberComity">
                    <h2 className="numberActivated">9</h2>
                    <h1>RUTH MACKENZIE</h1>
                    <p>Cultural advisor, CHAIR OF THE LONDON ARTS COUNCIL</p>
                </div>
                <div className="memberComity">
                    <h2 className="numberActivated">10</h2>
                    <h1>HANS ULRICH OBRIST</h1>
                    <p>Artistic Director at the Serpentine Galleries, London</p>
                </div>
            </div>
            <div className="lineComity">
                <div className="memberComity">
                    <h2 className="numberActivated">11</h2>
                    <h1>CHIARA PARISI</h1>
                    <p>DIRECTOR OF THE CENTRE POMPIDOU, METZ</p>
                </div>
                <div className="memberComity">
                    <h2 className="numberActivated">12</h2>
                    <h1>RENAUD SABARI</h1>
                    <p>FOUNDER AND CEO OF ARTER, PARIS</p>
                </div>
                <div className="memberComity">
                    <h2 className="numberActivated">13</h2>
                    <h1>NICOLAS TREMBLEY</h1>
                    <p>Director of the Syz Collection, Geneva</p>
                </div>
                <div className="memberComity">
                    <h2 className="numberActivated">14</h2>
                    <h1>MARIE-ANN YEMSI</h1>
                    <p>INDEPENDANT CURATOR AND CONTEMPORARY ART CONSULTANT, PARIS </p>
                </div>
            </div>
        </div>
 
      
        <hr></hr>
        <div id="selectionHeader">
                <h1>POST SELECTION</h1>
                </div>
        <hr></hr>
         
        <div id="artistSection3">

            <div id="postSelection">
                <img src={img2} />
                <div id="postSelText">
                    <p> Once selected, ORA’s teams provide artists with the means to produce, finance and exhibit their
                        projects. Each artist is paired with a curator allowing for the preparation of the project’s
                        diffusion throughout several institutional exhibition spaces. While being exhibited, the
                        artworks produced are sold on our platform ensuring a fair revenue for the artist. ORA also
                        implements a cooperative system: a part of the profits are reinjected in the production capital
                        fund enabling future projects to take shape. <br/> Once a project concludes, our ambition is
                        to contribute to bridging the gap which currently exists between actors of the art market and
                        many contemporary artists, whether early, mid or late career by introducing them to our network
                        of partner galleries. <br/> The submission platform will open shortly. Meanwhile, if you have
                        an idea you would like to discuss with our team you can get in touch with us ! </p>
                    <a href="/contact-us" id="getInTouch"><button className="btnWhite">BOOK A MEETING NOW</button></a>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
