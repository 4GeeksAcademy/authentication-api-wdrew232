import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Private() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivateData = async () => {
      try {
        const response = await axios.get("hhttps://expert-space-invention-x5vj4x6pqp9rc5r6-3001.app.github.dev/private", {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        });
        setMessage(response.data.message);
      } catch {
        navigate("/login");
      }
    };
    fetchPrivateData();
  }, [navigate]);

  return <h2>{message}</h2>;
}

export default Private;
