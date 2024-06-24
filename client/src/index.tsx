import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { createStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/rootReducer";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
