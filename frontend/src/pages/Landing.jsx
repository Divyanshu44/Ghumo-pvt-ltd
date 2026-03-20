import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="overlay">
        <nav className="navbar">
          <h2 className="logo">Ghumo</h2>
          <button className="menu-btn">☰</button>
        </nav>
        <div className="landing-content">
          <h1>Discover Your Next Adventure</h1>
          <p>
            Explore unique travel destinations around the world. From cozy
            beachfront cottages to luxurious mountain retreats, find the perfect
            place for your next getaway.
          </p>
          <div className="buttons">
            <button className="explore-btn" onClick={() => navigate("/home")}>
              Explore Listings
            </button>
            <button className="about-btn">About Us</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
