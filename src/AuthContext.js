// src/AuthContext.js
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const signUp = (username, password) => {
    // Save user details (This would be handled by a backend in a real app)
    localStorage.setItem('user', JSON.stringify({ username, password }));
    setIsAuthenticated(true);
    navigate('/login');
  };

  const signIn = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
