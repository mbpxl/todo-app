import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const mainPage = ReactDOM.createRoot(
  document.getElementById('mainPage') as HTMLElement
);
mainPage.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
