import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import Options from "./components/Options";
import { setup } from "./actions";

import "./styles.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";

const store = createStore(reducer);
store.dispatch(setup());

const App = () => {
  return (
    /// Provider for all nested components
    <Provider store={store}>
      <Header />
      <div className="App container">
        <Options />
      </div>
      <Footer />
    </Provider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
