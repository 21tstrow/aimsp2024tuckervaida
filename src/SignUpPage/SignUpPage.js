import React, { useState } from 'react';
import './SignUpPage.css'

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
    <div>
        <form className="form-container" onSubmit={handleSubmit}>
        <label classname="form-label" htmlFor="name">Name:</label>
        <input className='form-input'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
        />
        <br />

        <label classname="form-label" htmlFor="email">Email:</label>
        <input className='form-input'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
        <br />

        <label classname="form-label" htmlFor="password">Password:</label>
        <input className='form-input'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
        />
        <br />

        <button type="submit" className='form-button'>Sign Up</button>
        </form>
    </div>
  );
}

export default SignUpPage;