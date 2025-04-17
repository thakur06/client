import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { registerSW } from 'virtual:pwa-register';
import { LiefContext } from "./context/AppData.jsx";
registerSW();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LiefContext>
      <App />
    </LiefContext>
  </StrictMode>
);
