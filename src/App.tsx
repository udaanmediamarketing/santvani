
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


export default function App() {
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <Router>
      <Routes>

        {/* 🏠 Home Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home setActiveMenu={setActiveMenu} />
            </>
          }
        />

        {/* 🙏 Sant Dashboard Route */}
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

        {/* 🔐 Authentication Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/adminDashboard" element={<AdminDashboard />} />



      </Routes>
    </Router>
  );
}

