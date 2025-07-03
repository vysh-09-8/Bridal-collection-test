import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); 
    localStorage.clear();// Clear session storage
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/userhome">
          Bridal Management
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/userhome">
                Bridal Wear
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="view-cart">
                My Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="order">
                My Order
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="viewfavourites">
                My Whishlist
              </NavLink>
            </li>
            <li className="nav-item">
              <span className="nav-link " onClick={handleLogout} style={{ cursor: "pointer" }}>
                Logout
              </span>
            </li>
          </ul>
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
