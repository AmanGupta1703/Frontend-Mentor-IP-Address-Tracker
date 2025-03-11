import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import IpAddressProvider from "./contexts/IpAddress";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IpAddressProvider>
      <App />
    </IpAddressProvider>
  </StrictMode>,
);
