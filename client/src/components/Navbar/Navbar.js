import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../services/auth';

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null)
  })
}


export default function Navbar(props) {
  console.log(props.user)
  return (
    <div>
      
    </div>
  )
}
