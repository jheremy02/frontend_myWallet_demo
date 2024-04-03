import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { setAuthorizationHeader } from './api/client.js'
import { storage } from './utils/storage.js'
import { jwtDecode } from 'jwt-decode'


const accessToken = storage.get('authToken');

setAuthorizationHeader(accessToken);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

    <Router>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <App />
    </Router>
    </Provider>
    
  </React.StrictMode>,
)
