import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './redux/store';
import {persistor,store} from "./redux/store"
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    <ToastContainer />
    </PersistGate>
    </Provider>
    
    </BrowserRouter>
    
  </React.StrictMode>
);


reportWebVitals();
