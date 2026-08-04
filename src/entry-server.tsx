import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./app/App.tsx";

export function render(location = "/") {
  return renderToString(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>,
  );
}
