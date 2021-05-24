import axios from "axios";

const setAuthtoken = (token) => {
  let encoded = window.btoa(`${token.userName}:${token.password}`);
  let auth = `Basic ${encoded}`;
  if (token) {
    axios.defaults.headers.common["Authorization"] = auth;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthtoken;
