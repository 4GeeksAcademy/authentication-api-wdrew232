import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Private() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivateData = async () => {
      try {
        const response = await fetch("https://didactic-trout-g47gp69rw55qfqg4-3001.app.github.dev/api/private", { // 🔹 Ensure correct API route
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
            "Access-Control-Allow-Origin": "*", // 🔹 Added CORS header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message); // 🔹 Fixed key reference
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };

    fetchPrivateData();
  }, [navigate]);

  return (
    <div>
      <h2>{message}</h2>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ovmZhXUYldSHZNXS-c0MK76bJKj-EvwZRg&s" alt="Random Private Image" style={{ width: "500px", marginTop: "20px" }} />
    </div>
  );
}

export default Private;
