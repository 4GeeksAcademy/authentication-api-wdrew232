import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../store";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://didactic-trout-g47gp69rw55qfqg4-3001.app.github.dev/login", { email, password });
      
      if (response.status === 200) {
        setToken(response.data.access_token);
        alert("Login successful! Redirecting to private screen.");
        navigate("/private");
      }
    } catch (err) {
      alert("Login failed. Please check your credentials and try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
