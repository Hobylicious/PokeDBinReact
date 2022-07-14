import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Edit from './Components/Edit';
import Homepage from './Components/Homepage';
import Red from './Components/Red';
import Blue from './Components/Blue';
import Yellow from './Components/Yellow';
import PokemonRouter from './Components/PokemonRouter';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="pokemon" element={<PokemonRouter />} >
          <Route index element={<Homepage />} />
          <Route path=":id" element={<Edit />} />
        </ Route>
        <Route path="red" element={<Red />} />
        <Route path="blue" element={<Blue />} />
        <Route path="yellow" element={<Yellow />} />


      </ Route>
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
