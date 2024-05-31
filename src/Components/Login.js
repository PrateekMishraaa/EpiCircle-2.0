import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Logo1 from "../assets/remove-bg.png";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    try {
      if (email && password) {
        const response = await axios.post("https://epicircle-admin.vercel.app/login", {
          email,
          password,
        });
  
        const userData = {
          username: response.data.username,
          email: email,
          role: response.data.role
        }

        setToken(response.data.token);
        setIsLoggedIn(true);
  
        // Redirect to home page after successful login
        navigate("/homepage", { state: { userData } });
  
        // Show success toast
        toast.success("Login successful!");
      } else {
        setError("Email and Password are required");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        // Server responded with a status code outside the range of 2xx
        setError(error.response.data.message || "Login failed. Please try again.");
      } else if (error.request) {
        // Request was made but no response was received
        setError("Server is not responding. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an error
        setError("An unexpected error occurred. Please try again.");
      }
  
      // Show error toast
      toast.error("Login failed. Please check your credentials.");
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="first">
      <ToastContainer />
      <div className="login-container">
        <div className="image">
          <img
            src={Logo1}
            alt="logo"
          />
        </div>
        <div className="right">
          <div className="login-heading">
            <h1>Login to your account.</h1>
          </div>
          <div className="seprate">
            <h2>Kindly login with right credentials to continue.</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            {error && <div className="login-error">{error}</div>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          {isLoggedIn && (
            <Link to="/home" className="hidden-link">
              Go to Home
            </Link>
          )}
        </div>
        {/* <div className="image-container">
          <img src={AdminPic} alt="front image" />
        </div> */}
      </div>
    </div>
  );
};

export default Login;
