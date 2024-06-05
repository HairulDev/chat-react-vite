import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/reducers";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Group from "./pages/Group";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/group" element={<Group />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
