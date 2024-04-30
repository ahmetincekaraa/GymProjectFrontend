import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

<React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />

    </Router>
  </Provider>
</React.StrictMode>,
);
