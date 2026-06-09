import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home-container">

      <div className="home-card">

        <h1>⭐ Rating Platform</h1>

        <p>
          Search Stores, Rate Them and Share Your Feedback
        </p>

        <div className="home-buttons">

          <button
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
          >
            Register
          </button>

        </div>

      </div>

    </div>
  );
}

export default Home;