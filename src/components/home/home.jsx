import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import './home.css'
import Footer from '../footer/footer'

const Home = () => {
  return (
    <>
      <div className='home1'>
        <div className='home1-overlay'></div>
        <h2 className='home1head' align="center">Find and Report Lost <br />Items Easily</h2>
        <p className='home1para'>Locatex helps you track lost items on campus and report found <br /> belongings effortlessly.</p>
        <div className='btns'>
          <Link to="/Lost">
            <button className='lostbtn'>Lost</button>
          </Link>
          <Link to="/Found">
            <button className='Foundbtn'>Found</button>
          </Link>
        </div>
      </div>
      <div className="LocateXdescription">
        <div className='home2'>
          <h1 className='home2head'>Locatex: Find and <br /> Report Lost Items</h1>
          <p className='home2para'>Locatex is your go-to app for locating lost items and reporting <br /> found belongings on our college campus, ensuring a <br /> seamless experience for students and staff alike.</p>
          <button className="loginbtn">Log In</button>
        </div>
        <div className='home2img'>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
