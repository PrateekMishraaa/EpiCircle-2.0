import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import { useRoutes, useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const userData = location.state || {};
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="container">
      <h1>Home</h1>
      {loggedInUser ? (
        <div>
          <h2>Welcome, {loggedInUser.role === 'admin' ? 'Admin' : 'User'}</h2>
          <button onClick={handleLogout}>Logout</button>
          <div className="options">
            <h3>Options:</h3>
            {loggedInUser.role === 'admin' && (
              <div>
                <p>Option 1 - Admin Only</p>
                <p>Option 2 - Admin Only</p>
              </div>
            )}
            <p>Option 3 - Everyone</p>
            <p>Option 4 - Everyone</p>
          </div>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} userData={userData} />
      )}
    </div>
  );
};

const LoginForm = ({ onLogin, userData }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // e.preventDefault();
    // For simplicity, hardcoding username and password
    if (username === 'admin' && password === 'admin') {
      onLogin({ username: 'admin', role: 'admin' });
    } else if (username === 'user' && password === 'user') {
      onLogin({ username: 'user', role: 'user' });
    } else {
      setError('Invalid username or password');
    }

    const response = await axios.post("https://epicircle-admin.vercel.app/signup", {
            username: username,
            email: email,
            password: password,
            role: role
          });
  };

  const AdminPanel = () => {
    return(
      <form onSubmit={handleSubmit}>
      <h2>Who are you?</h2>
      <h2>{role}</h2>
      {error && <p className="error">{error}</p>}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Role:
        <select name="role" id="" onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="user">user</option>
        </select>
      </label>
      <br />
      <button type="submit">Add User</button>
    </form>
    );
  }

  const UserPannel = (userData) => {
    return(
      <div>
        <h2>Who are you?</h2>
      <h2>{userData.userData.userData.role}</h2>
          <span>{username}</span>
          <br />
          <span>{userData.userData.userData.email}</span>
          <br />
          <span>{userData.userData.userData.role}</span>
      </div>
    );
  }

  return (
    <>
    {
      userData.userData.role === "admin" ? <AdminPanel /> : <UserPannel userData={userData} />
    }
    </>
  );
};

export default HomePage;
