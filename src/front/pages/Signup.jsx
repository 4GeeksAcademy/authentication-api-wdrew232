import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://didactic-trout-g47gp69rw55qfqg4-3001.app.github.dev/signup", { email, password });
      
      if (response.status === 201) {
        alert("Signup successful! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      alert("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
