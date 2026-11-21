import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import FavoritePage from "./Pages/Favorite";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Index/Layout";

import "./Styling/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <div style={{ padding: "50px 24px", textAlign: "center" }}>
                  <h1>My Account</h1>
                  <p>Your account page is coming soon.</p>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <div style={{ padding: "2rem" }}>
                <h1>Page not found</h1>
                <p>The requested page does not exist.</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
