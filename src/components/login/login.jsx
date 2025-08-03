// src/components/login/Login.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
// import { AuthContext } from "../../AuthContext";  // Adjust path as needed
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Register from "../register/Register";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      // Save user and JWT token in global auth context
      dispatch({
        type: "LOGIN",
        payload: { user: { username: res.data.username, id: res.data.user_id }, token: res.data.token },
      });

      setError("");
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        New user? <Link to="/Register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
