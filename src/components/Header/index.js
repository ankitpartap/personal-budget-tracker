import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

function Header() {
    function logoutFnc(){
        alert("Logout")
    }
  return (
    <div className='navbar'>
        <p className='logo'>Budget Tracker</p>
        <p className='logo link' onClick={logoutFnc}>Logout</p>
    </div>
  )
}

export default Header