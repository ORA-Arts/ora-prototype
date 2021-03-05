import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <div>
      <footer id="footer">
         <div className="footerElement" id="footerAbout">
            <h2>ABOUT</h2>
            <Link to="/what-is-ora">WHAT IS ORA</Link>
            <Link to="/contact-us">CONTACT</Link>
         </div>
         <div class="footerElement" id="followUs">
            <h2>FOLLOW US</h2>
            <p>INSTAGRAM</p>
            <p>FACEBOOK</p>
         </div>
         <div className="footerElement" id="newsletter">
            <h2>NEWSLETTER</h2>
         </div>
         <div className="footerElement" id="footerORA">
            <h2>ORA</h2>
            <p>ORA is the only platform connecting artists, curators, institutions, galleries and collectors around a
               <span>cooperative system.</span></p>
         </div>
         <div className="footerElement" id="legal">
            <h2>LEGAL</h2>
            <Link to="/privacy-policy">PRIVACY POLICY</Link>
            <p>ALL RIGHT RESERVED © ORA 2021</p>
         </div>
      </footer>
      </div>
    )
  }
}

{/* 
            <form id="newsletterForm" action="/" method="POST">
            <input type="email" name="email" id="email" value="{{email}}" placeholder="ENTER YOUR EMAIL" required onblur="this.style.borderColor= this.checkValidity() ? 'green' : 'red'" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$">
            <button id="submitBtn" type="submit">SUBMIT</button>
            {{#if message}}
            <p>{{message}}</p>
            {{/if}}
            </form> */}