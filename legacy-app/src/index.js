import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import store from "./store";
import { Provider } from "react-redux";
// import ErrorBoundary from "./components/auth/ErrorBoundry";
import { BrowserRouter as Router } from "react-router-dom";
import "./global.scss";
import "./stylesheets/main.scss";

import "primereact/resources/themes/lara-light-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";



if (process.env.NODE_ENV !== "production") {
  console.log("we are in development mode!");
}
window.RDL = window.RDL || {};
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById("root")
);
