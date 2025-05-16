import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import { Toaster } from "react-hot-toast";
import Home from "./Home";
import Details from "./SelectedUsersDetails";
import NotFound from "./NotFound";
import YourDetails from "./YourDetails";

export default function App() {
  const ProtectedRoute = ({ children }) => {
    const isAuth = localStorage.getItem("userEmail")
      && localStorage.getItem("userFullName")
      && localStorage.getItem("userPassword");

    if (!isAuth) {
      return <Navigate to="/signup" replace />;
    }
    return children;
  };

  return (
    <div className="">
      <Routes>
        {/* Protected Route for signed in User */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/details"
          element={
            <ProtectedRoute>
              <YourDetails />
            </ProtectedRoute>
          }
        />

        {/* Public Routes which accessible to anyone*/}
        <Route path="/signup" element={<Signup />} />
        <Route path="/details/:uuid" element={<Details />} />

        {/* Redirect user */}
        <Route
          path="/"
          element={
            localStorage.getItem("userEmail") ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />

        {/* Wrong path Error handling */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}