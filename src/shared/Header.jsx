import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { useState } from 'react';

function Header ({ title}) {

    const navigate = useNavigate();

    return (
      <div className="header">
        <div className="title">
          <h1>{title}</h1>
        </div>
        <nav>
          {location.pathname !== "/" && (
            <button type="button" onClick={() => navigate("/")}>
              Home
            </button>
          )}
              <button type="button">My Books</button>
        </nav>
      </div>
    );
}

export default Header