import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApplicationContextProvider } from './store';

ReactDOM.render(
  <React.StrictMode>
    <ApplicationContextProvider>
      <App />
    </ApplicationContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
