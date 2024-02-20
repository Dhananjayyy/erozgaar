import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
//import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
//import '../node_modules/font-awesome/css/font-awesome.min.css';
import "font-awesome/css/font-awesome.min.css";
import { Provider } from "react-redux";
import mystore from "./mystore.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={mystore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
