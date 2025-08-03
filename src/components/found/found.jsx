import React from 'react'
import './found.css'
import Footer from '../footer/footer'

const Found = () => {
  return (
    <div className='found-container'>
      <div className="found1">
        <div className="image-found"></div>
        <div className="found1txt">
          <div className="found1title">Found Item Alert</div>
          <div className="found1text">If you find something on campus, please use the LocateX app to report it. Your honesty can help reunite lost items with their owners. Share details about the found item, and contribute to our community’s effort in keeping our campus safe.</div>
        </div>
      </div>
      <div className="found-form">
        <form action="" className="report-form">
         <h2 className="form-title">Report a Found Item</h2>
          <label htmlFor="name" className='form-labels'>Your Name</label>
          <input type="text" id="name" name="name" required className='form-inputs'/>

          <label htmlFor="email" className='form-labels'>Your Email</label>
          <input type="email" id="email" name="email" required  className='form-inputs'/>

          <label htmlFor="email" className='form-labels'>Your Contact</label>
          <input type="contact" id="contact" name="contact" required  className='form-inputs'/>

          <label htmlFor="item" className='form-labels'>Item Description</label>
          <textarea id="item" name="item" rows="4" required className='form-text'></textarea>
          
          <label htmlFor="item" className='form-labels'>Place Found</label>
          <textarea id="placefound" name="placefound" rows="4" required className='form-text'></textarea>

          <label htmlFor="date" className='form-labels'>Date Found</label>
          <input type="date" id="date" name="date" required  className='form-inputs'/>

          <label htmlFor="image" className='form-labels'>Upload Image</label>
          <input type="file" name="image" id="image" className='form-img' />
          
          <button type="submit" className="submit-button2">Submit Report</button>
        </form>
      </div>
      <Footer/>
    </div>
  )
}

export default Found
