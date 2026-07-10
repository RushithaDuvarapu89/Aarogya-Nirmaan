import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { ReferralProvider } from "./context/ReferralContext";

ReactDOM.createRoot(

    document.getElementById("root")

).render(

    <React.StrictMode>

        <ReferralProvider>

            <App />

        </ReferralProvider>

    </React.StrictMode>

);