import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/index";
const store = createStore(rootReducer, applyMiddleware(thunk));
import App from "./app";
import axios from "./config/axios";
import setAuthtoken from "./config/authToken";
import { setCurrentUserAction } from "./redux/actions/user";

axios.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

try {
  function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if (name == cookiePair[0].trim()) {
        // Decode the cookie value and return
        return decodeURIComponent(cookiePair[1]);
      }
    }
    // Return null if not found
    return null;
  }
  if (getCookie("token")) {
    const cookie = getCookie("token");
    setAuthtoken(JSON.parse(cookie));
    store.dispatch(setCurrentUserAction(JSON.parse(cookie)));
  }
} catch (er) {
  console.log("You are not login");
}
const root = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
