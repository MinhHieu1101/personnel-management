import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FontFaceObserver from "fontfaceobserver";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";

const raleway = new FontFaceObserver("Raleway");
raleway
  .load()
  .then(() => {
    document.documentElement.classList.add("raleway-loaded");
  })
  .catch(() => {
    err("%cRaleway Font failed to load", "color: red;");
  });

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
