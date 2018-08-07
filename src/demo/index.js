import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import HealthChart from '../lib/HealthChart'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();