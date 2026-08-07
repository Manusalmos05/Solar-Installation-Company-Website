import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/App.tsx";
// @ts-ignore
import "./styles/index.css";

const container = document.getElementById("root")!;
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "");
const isPrerendered = Boolean(container.firstElementChild);

const tree = (
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);

if (isPrerendered) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
