import React, { useState } from 'react'
import './CollectorSpace.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import img from '../../../images/collector-mobile.jpeg'


export default function CollectorSpace() {
    const [background, setBackground] = useState(true)

    const toggleBackground = () =>{
        setBackground(!background)
    }
    return (
            <div className="colectorContainer">
                <div className="header">
                    <div id='headerText'>
                        <h3>                                        </h3>
                        <h1>YOUR NEW WAY OF COLLECTING AND SUPPORTING CONTEMPORARY ART</h1>
                        <h2>ORA’s collector space is a curated, transparent and secure end-to-end sales solution.</h2>
                        <p>It provides all types of collectors a simple way to connect with an international audience of contemporary art galleries for private artwork acquisitions or participate in our incubator’s activities.</p>
                        
                    </div>
                    <a href="/contact-us" id="getInTouch"><button className="btnBlack">GET IN TOUCH FOR MORE INFOS</button></a>
                </div>
                <div className={`mainSection bg-${(background) ? 'services' : 'special'}`}>
                    <div className="tabContainer">
                    <Tabs>
                        <div className='collectorHeader'>
                            <TabList>
                                <Tab onClick={toggleBackground}>collector services</Tab><span> / </span><Tab onClick={toggleBackground}>support an artist project</Tab>
                            </TabList>
                        </div>
                    <TabPanel>
                        <div className="tabcontent">
                            <div className='mobileImage'>
                            <img src={img} alt="JIM SHAW, THE GREAT WHATSIT, 2017"/>
                            <span>JIM SHAW, THE GREAT WHATSIT, 2017</span>
                            </div>
                            <h2>Gain access to our advisory and private sales services for personalised artwork acquisitions</h2>
                            <p className="tabtext">ORA offers <span>a bespoke advisory service to assist collectors in their acquisition process :</span> whether
                    you’re
                    looking for emerging or established artists, ORA can source artworks from its international network
                    of
                    galleries to fit any budget and space :
                            </p>
                            <div className="boxes">
                                <div className="personal">
                                    <h3>PERSONAL ADVISOR :</h3>
                                    <p>
                                        We pair you with a representative who tailors an experience to fit your needs and
                                        preferences.
                                    </p>
                                    <a href="/contact-us" className="btnBlack">Book a meeting now</a>
                                </div>
                                <div className="line"></div>
                                <div className="special">
                                    <h3>SPECIAL SOURCING :</h3>
                                    <p>
                                        Create a request with your personal criteria and we will respond with matching artwork
                                        proposals.
                                    </p>
                                    <a href="/contact-us" className="btnBlack">Make a Special Sourcing request now</a>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="tabcontent">
                        <h2>ORA offers collectors the opportunity to participate in the creation of artworks alongside artists
                    selected by our expert committee </h2>
                        <article className="tabtext">Thanks to this opportunity, collectors are able to :
                            <ul>
                                <li>. Participate in an artistic project <span>from conception to exhibition</span></li>
                                <li>. <span>Pre-acquire artworks</span> by promising artists, enrich their collection and discover
                                new talents </li>
                                <li>. Integrate ORA’s ecosystem and benefit from <span>privileged access to our network, events and
                                exhibitions</span></li>
                                <li>. Become a <span>cultural actor integrated in today’s artistic community</span></li>
                            </ul>
                        </article>
                        <div className="supportFooter">
                            <a href="/support-an-artist-project" className="btnBlack">
                                Participate Now</a>
                            </div>
                        </div>
                    </TabPanel>
                    </Tabs>
                    </div>
                </div>
            </div>
    )
}
