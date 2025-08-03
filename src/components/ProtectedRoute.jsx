// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
// import { AuthContext } from "./context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AuthContext);
  return state.user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
