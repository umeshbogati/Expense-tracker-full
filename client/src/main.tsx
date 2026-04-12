import { createRoot } from "react-dom/client";
import "./index.css";
import "./root.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { store } from "./store/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
    
    <ToastContainer />
  </BrowserRouter>,
);
