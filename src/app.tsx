import React, { Fragment } from "react";
import Appbar from "./components/appbar";
import Footer from "./components/footer";
import Main from "./routes/main";
import "./sass/main.scss";
function App() {
  return (
    <Fragment>
      <Appbar />
      <main className="main">
        <Main />
      </main>
      <Footer />
    </Fragment>
  );
}
export default App;
