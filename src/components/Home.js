import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/style.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div>
        <h1 className="homepage-title">Welcome to Book Finder</h1>
        <p className="homepage-description">Discover your next great read.</p>
        <Link to="/books">
          <button className="homepage-button">Explore Books</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
