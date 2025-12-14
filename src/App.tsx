import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SantNavbar from "./components/sant-navbar";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import SantDashboard from "./pages/sant/santdashboard";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/adminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute"; 

export default function App() {
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <Router>
      <Routes>

        {}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home setActiveMenu={setActiveMenu} />
            </>
          }
        />

        {}
        <Route
          path="/sant/:name"
          element={
            <>
              <SantNavbar
                onMenuClick={setActiveMenu}
                activeMenu={activeMenu}
              />
              <SantDashboard
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            </>
          }
        />

        {}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {}
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}
