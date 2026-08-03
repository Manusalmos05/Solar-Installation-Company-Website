import { renderToString } from "react-dom/server";
import App from "./app/App.tsx";

export function render() {
  return renderToString(<App />);
}
