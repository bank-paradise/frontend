// System
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import RootContainer from "router";
import * as serviceWorker from "./serviceWorker";

// Redux
import { store } from "./core/store";
import { Provider } from "react-redux";

// Styles
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <RootContainer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  </BrowserRouter>,
  document.getElementById("vanilla_coffee")
);

// change to register() for active PWA
serviceWorker.register();
