import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import SearchProvider from "./components/context and reducers/SearchContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { LibraryProvider } from "./components/context and reducers/LibraryContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <LibraryProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </LibraryProvider>
  </Auth0Provider>
);

reportWebVitals();
