import React, { Component } from 'react'
import './MenuMobile.css'
import { Link } from "react-router-dom";

export default class MenuMobile extends Component {
  
  
  render() {
    const showHideClassName = this.props.showMenu ? "menuModal display-block" : "menuModal display-none";
    return (
      <div className={showHideClassName} id='menu'>
      <ul>
       <li>
           <Link  to="/what-is-ora" onClick={this.props.handleClose}>WHAT IS ORA?</Link>
         </li>
         <li>
           <Link  to='/artist-open-call'onClick={this.props.handleClose}>ARTIST OPEN CALL</Link>
         </li>
         <li> 
           <Link  to='/collector-space'onClick={this.props.handleClose}>COLLECTOR SPACE</Link>
         </li>
         <li>
           <Link to='/support-an-artist-project'onClick={this.props.handleClose}>SUPPORT AN ARTIST PROJECT</Link>
         </li>
         <li>
           <Link to='/contact-us'onClick={this.props.handleClose}>CONTACT US</Link>
         </li>

        </ul>
      </div>
    )
  }
}
