import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import './i18nConfig';

import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
