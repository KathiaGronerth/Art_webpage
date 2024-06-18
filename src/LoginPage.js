import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [isRegistering, setIsRegistering] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email); // Debugging line
    console.log("Password:", password); // Debugging line

    try {
      const response = await axios.post(
        "/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token } = response.data;

      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error.response || error.message); // Debugging line
      setError("Invalid email or password");
    }
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("/api/auth/register", { email, password });
  //     setError("Registration successful. You can now log in.");
  //     setIsRegistering(false);
  //   } catch (error) {
  //     setError("Registration failed");
  //   }
  // };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/update-password", { email, newPassword });
      setError("Password updated successfully.");
      setIsUpdatingPassword(false);
    } catch (error) {
      setError("Password update failed");
    }
  };

  return (
    <div className="login-container">
      <h1>{isUpdatingPassword ? "Update Password" : "Login"}</h1>
      {!isUpdatingPassword && (
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      )}

      {/* {isRegistering && (
        <form onSubmit={handleRegister} className="login-form">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
        </form>
      )} */}

      {isUpdatingPassword && (
        <form onSubmit={handleUpdatePassword} className="login-form">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
          />
          <button type="submit">Update Password</button>
        </form>
      )}

      {error && <p className="error">{error}</p>}

      {!isUpdatingPassword && (
        <div className="login-links">
          {/* <button onClick={() => setIsRegistering(true)}>Register</button> */}
          <button onClick={() => setIsUpdatingPassword(true)}>
            Update Password
          </button>
        </div>
      )}

      {isUpdatingPassword && (
        <div className="login-links">
          <button
            onClick={() => {
              // setIsRegistering(false);
              setIsUpdatingPassword(false);
            }}
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
