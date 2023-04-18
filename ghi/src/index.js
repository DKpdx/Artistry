import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthProvider
        tokenUrl={`${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`}
      >
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
