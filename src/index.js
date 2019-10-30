import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import Options from "./components/Options";
import { setup } from "./actions";

import "./styles.scss";

const store = createStore(reducer);
store.dispatch(setup());

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Options />
      </div>
    </Provider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
