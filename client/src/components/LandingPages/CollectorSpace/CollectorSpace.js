import React from 'react'
import './CollectorSpace.css'

export default function CollectorSpace() {
  return (
    <div>
      <div className="colectorContainer">
    <div className="header">
    <div id='headerText'>
        <h1> YOUR NEW WAY OF COLLECTING AND SUPPORTING CONTEMPORARY ART</h1>
        <h2>ORA’s collector space is a curated, transparent and secure end-to-end sales solution.</h2>
        <p>It provides all types of collectors a simple way to connect with an international audience of contemporary art galleries for private artwork acquisitions or participate in our incubator’s activities.</p>
    </div>
    <a href="/contact-us" id="getInTouch"><button className="btnBlack">GET IN TOUCH FOR MORE INFOS</button></a>
    </div>
    <div id="collectorMain" className="bg-services">
        <div className="tabs">
            <div className="tab">
                <button className="tablinks" onclick="openTab(event, 'Services')" id="defaultOpen">collector services</button>
                /
                <button className="tablinks" onclick="openTab(event, 'Support')">support an artist project</button>
            </div>
            {/* <!-- Tab content --> */}
            <div id="Services" className="tabcontent">
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

            <div id="Support" className="tabcontent">
                <h2>ORA offers collectors the opportunity to participate in the creation of artworks alongside artists
                    selected by our expert committee </h2>
                <p className="tabtext">Thanks to this opportunity, collectors are able to :
                <ul>
                    <li>. Participate in an artistic project <span>from conception to exhibition</span></li>
                    <li>. <span>Pre-acquire artworks</span> by promising artists, enrich their collection and discover
                        new talents </li>
                    <li>. Integrate ORA’s ecosystem and benefit from <span>privileged access to our network, events and
                            exhibitions</span></li>
                    <li>. Become a <span>cultural actor integrated in today’s artistic community</span></li>
                </ul>
                </p>
                <div className="supportFooter"><a href="/support-an-artist-project" className="partBtn">Participate Now</a></div>
                
            </div>
        </div>
    </div>
</div>
{/* <script>
        //tabs panel for collector-area
        function openTab(evt, tabName) {
        // Declare all variables
        let i, tabcontent, tablinks, collectorMain;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");

        }
        collectorMain = document.querySelector("#collectorMain")
        collectorMain.classList.toggle("bg-special")
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
        }
        // Get the element with id="defaultOpen" and click on it
        document.querySelector("#defaultOpen").click();
</script> */}
    </div>
  )
}
