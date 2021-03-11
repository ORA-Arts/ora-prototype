import React, { Component } from 'react'
import './MenuMobile.css'
import { Link } from "react-router-dom";
import logo from "../../images/LOGO_white.png"
export default class MenuMobile extends Component {
  render() {
    const showHideClassName = this.props.showMenu ? "menuModal open" : "menuModal close";
    return (
      <div className={showHideClassName} id='menu'>
        <div className="upperNavButtons">
          <a href='/'>
            <img src={logo} alt="ORA" width="auto" height="50px" />
          </a>
          <button onClick={this.props.handleClose}>{this.props.showMenu ? 'CLOSE' : 'MENU'} </button>
        </div>
        <ul>
          <li>
            <Link to="/what-is-ora" onClick={this.props.handleClose}>WHAT IS ORA?</Link>
          </li>
          <li>
            <Link to='/artist-open-call' onClick={this.props.handleClose}>ARTIST OPEN CALL</Link>
          </li>
          <li>
            <Link to='/collector-space' onClick={this.props.handleClose}>COLLECTOR SPACE</Link>
            <ul className='mobile-submenu'>
              <li><Link to='/collector-space' onClick={this.props.handleClose}>COLLECTOR SERVICES</Link></li>
              <li><Link to='/collector-space' onClick={this.props.handleClose}>SUPPORT AN ARTIST PROJECT</Link></li>
            </ul>
          </li>
          <li>
            <Link to='/support-an-artist-project' onClick={this.props.handleClose}>SUPPORT AN ARTIST PROJECT</Link>
          </li>
          <li>
            <Link to='/contact-us' onClick={this.props.handleClose}>CONTACT US</Link>
            <ul className='mobile-submenu'>
              <li><Link to='/collector-space' onClick={this.props.handleClose}>CONTACT US</Link></li>
              <li><Link to='/collector-space' onClick={this.props.handleClose}>TEAM</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}
