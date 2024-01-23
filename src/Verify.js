// Verify.js
import React, { useState } from 'react';
import AppData from './AppData';

const Verify = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Replace the following condition with your actual authentication logic
    if (email === 'xyz@gmail.com' && password === '123456') {
      setIsFormSubmitted(true);
    } else {
      alert("Invalid credentials");
      console.log('error');
    }
  };

  return (
    <div>
      {isFormSubmitted ? (
        <AppData />
      ) : (
    <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button className="form-button" type="submit">
            Submit
          </button>
        </form>
        </div>
      )}
    </div>
  );
};

export default Verify;
