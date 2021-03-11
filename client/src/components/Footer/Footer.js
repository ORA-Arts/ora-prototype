import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './Footer.css'
import { addNewsletter } from '../../services/auth'

export default class Footer extends Component {

   constructor(props) {
      super(props);
      this.state = {
        newsletter: '',
        message: ''
    }
    }

    handleChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      })
    }
    
    handleSubmit = event => {
      event.preventDefault();
      const { newsletter } = this.state;
      addNewsletter(newsletter)
        .then(email => {
          if (email.message) {
            this.setState({
              message: email.message,
              newsletter: ''
            })
          } else {
            // the response from the server is a user object -> signup was successful
            // we want to put the user object in the state of NavBar.js
            console.log('OK')
            this.setState({
               message: 'EMAIL ADDED TO THE NEWSLETTER'
               });
            // this.props.history.push('/'); // this need to be passed in the router app.js
          }
          console.log(this.state.message)
        })
    }

  render() {
    return (
      <div id='footerDiv'>
<hr/>
      <footer id="footer">

         <div className="footerElement" id="footerAbout">
            <h2>ABOUT</h2>
            <Link to="/what-is-ora">WHAT IS ORA</Link>
            <Link to="/contact-us">CONTACT</Link>
         </div>
         <div className="footerElement" id="followUs">
            <h2>FOLLOW US</h2>
            <p>INSTAGRAM</p>
            <p>FACEBOOK</p>
         </div>
         <div className="footerElement" id="newsletter">
            <h2>NEWSLETTER</h2>
         <form onSubmit={this.handleSubmit}>
         <label htmlFor="newsletter"></label>
          <input
            type="email"
            name="newsletter"
            placeholder="EMAIL"
            value={this.state.newsletter}
            onChange={this.handleChange}
            id="newsletter"
          />
          <button id="submitBtn" type="submit">SUBMIT</button>
          </form>
          {this.state.message && (
            <h3>{this.state.message}</h3>
          )}
         </div>
         <div className="footerElement" id="footerORA">
            <h2>ORA</h2>
            <p>ORA is the only platform connecting artists, curators, institutions, galleries and collectors around a
               <span style={{fontFamily:'akzidenz-grotesk_probold'}}> cooperative system.</span></p>
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
