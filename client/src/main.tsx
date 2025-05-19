import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { appStore } from "./app/store.ts";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={appStore}>
        <App />
        <Toaster />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
