import React from 'react';
import './App.css';
import axios from 'axios';
import Homepage from './Components/Homepage';
import { BrowserRouter, Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/pokemon">Homepage</Link>
        <Link to="/user-pokedex">Your Pokédex</Link>
        <Link to="/red">Red</Link>
        <Link to="/blue">Blue</Link>
        <Link to="/yellow">Yellow</Link>

      </nav>
      <Outlet />
    </div>
  )
}

export default App;
