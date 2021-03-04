import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/auth";
import "./NavBar.css";
import logo from "../../images/LOGO_1.png"

 

const handleLogout = (props) => {
  logout().then(() => {
    props.setUser(null);
  });
};

export default function Navbar(props) {
  console.log(props.user);
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
        {props.user ? (
          <>
          <li>
          <Link className ="link" to='/myprofile'>MY PROFILE</Link>
          <Link className ="link" to='/' onClick={() => handleLogout(props)}>/ LOG OUT</Link>
          </li>
          </>
        ) : (
          <>
          <li>
          <Link className ="link" to='/signup'>SIGN UP</Link>
          <Link className ="link" to='/login'>/ LOG IN</Link>
          </li>
          </>
        )}
      </ul>
    </div>
  );
}

{
  /* <li><a href="/artist-open-call" class="link">ARTIST OPEN CALL</a></li>
            <li><a href="/collector-space" class="link">COLLECTOR SPACE</a></li>
            <li><a href="/support-an-artist-project" class="link">SUPPORT AN ARTIST PROJECT</a></li>

         <Link href="/">
            <img src="./images/LOGO_1.png" alt="ORA" width="auto" height="50">
         </Link>
         <ul id="navtitles">
            <li><a href="/what-is-ora" class="link {{whiteNav}}">WHAT IS ORA?</a></li>
            <li><a href="/artist-open-call" class="link">ARTIST OPEN CALL</a></li>
            <li><a href="/collector-space" class="link">COLLECTOR SPACE</a></li>
            <li><a href="/support-an-artist-project" class="link">SUPPORT AN ARTIST PROJECT</a></li>
            <li>
               {{#if isAuthenticated}}
               <a href="/logout" class="link" style="font-weight: 900;">LOGOUT</a>
               {{else}}
               <a href="#" class="link" id="openLoginModal">LOGIN</a>
               {{/if}}
               <a href="#" class="link" id="openLoginModal" style="display:none;">LOGIN</a>
            </li>
         </ul>
      </nav> */
}
