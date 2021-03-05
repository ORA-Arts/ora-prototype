import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";
import "./Navbar.css";
import logo from "../../images/LOGO_1.png"
import LogInModal from "../LogInModal/LogInModal"
import SignUpModal from '../SignUpModal/SignUpModal'


// const handleLogout = (props) => {
//   logout().then(() => {
//     props.setUser(null);
//   });
// };


class Navbar extends Component {
  constructor(props) {
    super(props);
      this.state = {
      showLogin: false,
      showSignup : false, 
      user: props.user
    };
    this.setUser = this.setUser.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  
handleLogout = () => {
  logout().then(() => {
    this.setState({user: null});
  });
};

showLoginModal = () => {
    this.setState({ showLogin: true });
  };

  showSignupModal = () => {
    this.setState({ showSignup: true });
  };

  hideModal = () => {
    this.setState({ showLogin: false });
    this.setState({ showSignup: false });
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <div id="navbar" >
      <a href='/'>
        <img src={logo} alt="ORA" width="auto" height="50" />
     </a>
       <ul id="navtitles">
         <li>
           <Link className ="link" to="/what-is-ora">WHAT IS ORA?</Link>
         </li>
         <li>
           <Link className ="link" to='/artist-open-call'>ARTIST OPEN CALL</Link>
         </li>
         <li> 
           <Link className ="link" to='/collector-space'>COLLECTOR SPACE</Link>
         </li>
         <li>
           <Link className ="link"to='/support-an-artist-project'>SUPPORT AN ARTIST PROJECT</Link>
         </li>
         {this.state.user ? (
           <>
           <li>
           <Link className ="link" to='/myprofile'>MY PROFILE</Link>
           <Link className ="link" to='/' onClick={() => this.handleLogout()}>/ LOG OUT</Link>
           </li>
           </>
         ) : (
           <>
           <li>
           <button className="btnAuth" onClick={this.showSignupModal}>SIGN UP</button>
           <SignUpModal show={this.state.showSignup} handleClose={this.hideModal} setUser={this.setUser}/>
           {/* <Link className ="link" to='/signup'>SIGN UP</Link> */}
           <button className="btnAuth" onClick ={this.showLoginModal}>/ LOG IN</button>
           <LogInModal showLogin={this.state.showLogin} handleClose={this.hideModal} setUser={this.setUser}/>
           </li>
           </>
         )}
       </ul>
     </div>
    )
  }
}

export default Navbar;