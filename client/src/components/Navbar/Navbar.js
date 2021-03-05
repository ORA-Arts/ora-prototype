import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";
import "./NavBar.css";
import logo from "../../images/LOGO_1.png"
import LogInModal from "../LogInModal/LogInModal"


// const handleLogout = (props) => {
//   logout().then(() => {
//     props.setUser(null);
//   });
// };


export default class NavBar extends Component {
  constructor(props) {
    super(props);
      this.state = {
      show: false,
      user: this.props.user
    };
    this.setUser = this.setUser.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  
handleLogout = () => {
  logout().then(() => {
    this.setState({user: null});
  });
};

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    console.log(this.state.user);
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
           <Link className ="link" to='/' onClick={() => logout()}>/ LOG OUT</Link>
           </li>
           </>
         ) : (
           <>
           <li>
           <Link className ="link" to='/signup'>SIGN UP</Link>
           <button className ="link" onClick ={this.showModal}>/ LOG IN</button>
           <LogInModal show={this.state.show} handleClose={this.hideModal} setUser={this.setUser}/>
           {/* <Link className ="link" to='/login'>/ LOG IN</Link> */}
           </li>
           </>
         )}
       </ul>
     </div>
    )
  }
}

