import React from "react";
import { createRoot } from "react-dom/client";
import { ModalContextProvider } from "src/hooks";
import App from "src/components/App/App";
import "./index.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </React.StrictMode>
);
