import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
