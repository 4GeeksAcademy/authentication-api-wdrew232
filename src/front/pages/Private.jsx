import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Private() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivateData = async () => {
      try {
        const response = await axios.get("https://didactic-trout-g47gp69rw55qfqg4-3001.app.github.dev/private", {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("authToken")}` } // Fix token retrieval
        });
        setMessage(response.data.msg); // Fix response key
      } catch {
        navigate("/login"); // Redirect to login if unauthorized
      }
    };
    fetchPrivateData();
  }, [navigate]);

  return (
    <div>
      <h2>{message}</h2>
      <img src="/assets/imag.jpg" alt="Random Private Image" style={{ width: "300px", marginTop: "20px" }} />
    </div>
  );
}

export default Private;
