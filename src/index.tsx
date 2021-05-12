import React from "react"
import ReactDOM from "react-dom"
import {createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import rootReducer from './redux/reducers/index'
const store = createStore(rootReducer, applyMiddleware(thunk))
import App from './app'
import axios from './config/axios'

axios.interceptors.request.use(  (req)=> {
    return req
  },    (error)=> {
    return Promise.reject(error);
  });
  axios.interceptors.response.use(  (response) => {
    return response;
  }, (error) => {
  
    return Promise.reject(error);
  });
const root = document.getElementById('root')

 
ReactDOM.render(
    <Provider store={store}>
<App />
    </Provider>
,
    root
);
