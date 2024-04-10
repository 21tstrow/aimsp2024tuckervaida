import React, { useState } from 'react';
import './SignUpPage.css';
import lockimg from "./lock.png";

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted:', formData);
    // Implement your form submission logic here (e.g., send data to server)
  };

  return (
    <div className='sign-up-page'>
        <h1>Create an Account</h1>
        <form className="form-container" onSubmit={handleSubmit}>
      
        <label classname="form-label" htmlFor="name">Name</label>
        <input className='form-input'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
        />
        <br />
       
        <label classname="form-label" htmlFor="phone">Phone (recommended)</label>
        <input className='form-input'
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
        />
        <br />

        <label classname="form-label" htmlFor="email">Email</label>
        <input className='form-input'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
        <br />

        <label classname="form-label" htmlFor="username">Username</label>
        <input className='form-input'
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
        />
        <br />


        <label classname="form-label" htmlFor="password">Password</label>
        <input className='form-input'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
        />
        <br />

        <button type="submit" className='form-button'>Create Account</button>
        </form>
    </div>
  );
}

export default SignUpPage;