import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// pages ship prerendered markup (scripts/prerender.ts): hydrate over it
hydrateRoot(document.getElementById("root")!, <StrictMode><App /></StrictMode>);
