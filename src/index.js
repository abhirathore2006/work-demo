import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./app";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store";
import "react-flexbox-grid/dist/react-flexbox-grid.css";
import "font-awesome/css/font-awesome.css";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
registerServiceWorker();
