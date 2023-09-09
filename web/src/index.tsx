import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./assets/styles/reset.scss";
import "./assets/styles/style.scss";
import "./assets/styles/responsive.scss";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <App />
  </>
);

reportWebVitals();
