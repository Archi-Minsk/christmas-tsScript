import App from "./components/App";
import "./global.css";

function start() {
  const rootEl = document.querySelector("#root");
  if (rootEl) {
    const app = new App(rootEl);
    app.render();
  }
}

start();
