import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./app/App.tsx";
// @ts-ignore
import "./styles/index.css";

const container = document.getElementById("root")!;
const isPrerendered = Boolean(container.firstElementChild);

if (isPrerendered) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
