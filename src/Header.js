import React from "react";
import { Link } from "react-router-dom";
import logo from "../public/logo.jpg";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="Carl_Canga" />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {/* <a href="#about">About the Artist</a> */}
            <Link to="/about">About the Artist</Link>
          </li>
          <li className="dropdown">
            <a href="#works">Works</a>
            <ul className="dropdown-content">
              <li>
                <Link to="/works/airplanes">Airplanes</Link>
              </li>
              <li>
                <Link to="/works/outdoors">Outdoors</Link>
              </li>
              <li>
                <Link to="/works/faces">Faces</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/contact">Contact the Artist</Link>
          </li>
        </ul>
      </nav>
      <div className="social-links">
        <a
          href="https://www.facebook.com/carl.canga"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://www.instagram.com/carlcanga/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>

        <a href="/contact">
          <i className="fa fa-envelope"></i>
        </a>
      </div>
    </div>
  );
};

export default Header;
