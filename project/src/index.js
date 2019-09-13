import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

const composeEnchacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //devtool icin
const store = createStore(
  reducers,
  composeEnchacers(applyMiddleware(reduxThunk))
); // devtool ve reducerların store a baglanması

ReactDOM.render(
  //redux kullanıkerken eklenmesi gereken proivder componenti ve icindeki store
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
