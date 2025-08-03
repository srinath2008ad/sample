import React, { useState } from 'react';
import './lost.css';
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';
import LostItemsTable from '../lostitems/lostitems';

const Lost = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    item: '',
    date: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm(prev => ({ ...prev, image: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('email', form.email);
      data.append('item', form.item);
      data.append('date', form.date);
      if (form.image) {
        data.append('image', form.image);
      }

      const res = await fetch('http://localhost:5000/api/lost-items', {
        method: 'POST',
        body: data
      });

      if (res.ok) {
        alert("Report submitted!");
        setForm({
          name: '',
          email: '',
          item: '',
          date: '',
          image: null
        });
        document.getElementById('image').value = '';
      } else {
        const errorData = await res.json();
        alert(errorData.error || "There was an error submitting your report.");
      }
    } catch (error) {
      alert("There was an error submitting your report. Please try again later.");
    }
  };

  return (
    <div className='lost-container'>
      <div className="lost1">
        <div className="image"></div>
        <div className="lost1-head">
          <h1 className='lost-title'>Lost Item Report</h1>
          <p className='lost-text'>
            If you've lost something on campus, please fill out the form to report it.
            Our community is here to help you find your belongings. Provide as much detail as possible to assist in the search for your lost item.
          </p>
        </div>
      </div>

      <div className="lost-form">
        <form className="report-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Report a Lost Item</h2>

          <label htmlFor="name" className='form-labels'>Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className='form-inputs'
            value={form.name}
            onChange={handleChange}
          />

          <label htmlFor="email" className='form-labels'>Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className='form-inputs'
            value={form.email}
            onChange={handleChange}
          />

          <label htmlFor="item" className='form-labels'>Item Description</label>
          <textarea
            id="item"
            name="item"
            rows="4"
            required
            className='form-text'
            value={form.item}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="date" className='form-labels'>Date Lost</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            className='form-inputs'
            value={form.date}
            onChange={handleChange}
          />

          <label htmlFor="image" className='form-labels'>Choose image</label>
          <input
            type="file"
            name="image"
            id="image"
            className='form-img'
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit" className="submit-button">Submit Report</button>
        </form>
      </div>
      <LostItemsTable/>
      <ul>
        <li>
          <Link to="/lostitemslist">Lost items list</Link>
        </li>
      </ul>

      <Footer />
    </div>
  );
};

export default Lost;
