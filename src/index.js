import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux/es/exports";
import store from "./service/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
