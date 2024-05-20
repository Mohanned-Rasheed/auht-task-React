import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
