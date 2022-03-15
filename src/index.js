import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap-reboot.css";
import "./styles/global.css";

import App from "./App";

import AppProviders from "./context/AppProviders";
ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
