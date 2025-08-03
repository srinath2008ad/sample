import React from 'react'
import './navbar.css'
import { Link ,Routes, Route  } from 'react-router-dom'
import Home from '../home/home'
import Lost from '../lost/lost'
import Found from '../found/found'
// import Apps from '../login/login'
import Login from '../login/login'
import Register from '../register/Register'

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div>
          <h3 className="title">LocateX</h3>
        </div>
        <div>
          <ul className="navbar-list">
            {/* <li className="navbar-home">Home</li>
            <li className="navbar-lost">Lost</li>
            <li className="navbar-found">Found</li> */}
            <li>
              <Link to="/" className="navbar-home">Home</Link>
            </li>
            <li>
              <Link to="/Lost" className="navbar-lost">Lost</Link>
            </li>
            <li>
              <Link to="/Found" className="navbar-found">Found</Link>
            </li>
            <li>
              <Link to="/login" className="navbar-found">Login</Link>
            </li>
            <li>
              <Link to="/register" className="navbar-found">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Lost" element={<Lost/>} />
        <Route path="/Found" element={<Found/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        
      </Routes>
    </>
  )
}

export default Navbar
