import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';

import App2 from './App2'

ReactDOM.render(
  <BrowserRouter>
    <App2 />
  </BrowserRouter>,
  document.getElementById('root')
);

