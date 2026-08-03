import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/App.tsx";
// @ts-ignore
import "./styles/index.css";

const basename = import.meta.env.BASE_URL.replace(/\/+$/, "");

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
);
