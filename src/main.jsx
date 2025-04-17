import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LiefContext } from "./context/AppData.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LiefContext>
      <App />
    </LiefContext>
  </StrictMode>
);
