import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import App from "./App.jsx";
import SpaceVisitTracker from "./components/SpaceVisitTracker.jsx";
import AnalyticsTracker from "./components/AnalyticsTracker.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <HashRouter>
          <AnalyticsTracker />
          <SpaceVisitTracker />
          <App />
        </HashRouter>
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
