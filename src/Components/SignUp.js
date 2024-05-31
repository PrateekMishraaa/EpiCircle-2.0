// SignUp.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file for styling
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate(); // React Router's useNavigate hook for redirection
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        if (formData.email && formData.password) {
          const response = await axios.post("https://epicircle-admin.vercel.app/signup", {
            username: formData.username,
            email: formData.email,
            password: formData.password
          });
    
        //   setToken(response.data.token);
        //   setIsLoggedIn(true);
    
          // Redirect to home page after successful login
          navigate("/login");
    
          // Show success toast
          toast.success("Login successful!");
        } else {
        //   setError("Email and Password are required");
        }
      } catch (error) {
        console.error("Login error:", error);
        if (error.response) {
          // Server responded with a status code outside the range of 2xx
        //   setError(error.response.data.message || "Login failed. Please try again.");
        } else if (error.request) {
          // Request was made but no response was received
        //   setError("Server is not responding. Please try again later.");
        } else {
          // Something happened in setting up the request that triggered an error
        //   setError("An unexpected error occurred. Please try again.");
        }
    
        // Show error toast
        toast.error("Login failed. Please check your credentials.");
      }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUp;
