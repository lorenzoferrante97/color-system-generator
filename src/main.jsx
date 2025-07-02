import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./contexts/globalContext";
import { ThemeProvider } from "./contexts/themeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GlobalProvider>
  </StrictMode>,
);
