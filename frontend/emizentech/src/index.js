import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    <ToastContainer />
    </Provider>
    
    </BrowserRouter>
    
  </React.StrictMode>
);


reportWebVitals();
