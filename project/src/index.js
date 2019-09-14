import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const composeEnchacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // to configure our devtool
const store = createStore(
  reducers,
  composeEnchacers(applyMiddleware(reduxThunk))
); //  wiring up devtool and reducers to store

ReactDOM.render(
  //Provider tag surrends out app with store prop
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
