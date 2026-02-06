import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import './index.css'


const rootElement: HTMLElement | null = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);