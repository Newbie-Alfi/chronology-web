import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./assets/scss/base/reset.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import "@fontsource/public-sans";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
