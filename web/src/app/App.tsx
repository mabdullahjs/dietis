import React from "react";
import { Provider } from "react-redux";
import Context from "./Context";
import Helmet from "./Helmet";
import Router from "./Router";
import store from "./redux/store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Context>
        <Helmet />
        <Router />
      </Context>
    </Provider>
  );
};

export default App;
