import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "antd/dist/reset.css"; // or 'antd/dist/antd.css' depending on the version
import { ModalProvider } from "./state/context/modalContext";
import { SearchProvider } from "./state/context/searchContext";
import { AuthProvider } from "./state/context/authContext"; // Import your AuthContext provider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient and QueryClientProvider
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

// Create a new QueryClient instance
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <ModalProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </ModalProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
