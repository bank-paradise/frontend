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

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <RootContainer />
    </Provider>
  </BrowserRouter>,
  document.getElementById("vanilla_coffee")
);

// change to register() for active PWA
serviceWorker.unregister();
