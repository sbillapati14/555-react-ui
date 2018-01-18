import React from 'react';
import ReactDOM from 'react-dom';


import './index.css';
import AppWrapper from '../lib/AppWrapper';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AppWrapper>
    <App />
  </AppWrapper>
  , document.getElementById('root')
);
registerServiceWorker();