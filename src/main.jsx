import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import { AnunciosApp } from './AnunciosApp';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <AnunciosApp/>
      </BrowserRouter>
  </React.StrictMode>,
)
