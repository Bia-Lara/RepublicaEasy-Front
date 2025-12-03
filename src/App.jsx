import React from "react";
import Router from "./router";
import { ToastProvider } from "./components/Modals/Toast"; 

export default function App() {
  return (
    <ToastProvider>
      <Router />
    </ToastProvider>
  );
}
