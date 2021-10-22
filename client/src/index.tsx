import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserLocationProvider } from "./lib/geolocation";

ReactDOM.render(
    <React.StrictMode>
        <UserLocationProvider>
            <App />
        </UserLocationProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
