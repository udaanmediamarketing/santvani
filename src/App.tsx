// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";

// import SantNavbar from "./components/sant-navbar";
// import Navbar from "./components/navbar";
// import Home from "./pages/home";
// import SantDashboard from "./pages/sant/santdashboard";

// import SignIn from "./pages/sign-in";
// import SignUp from "./pages/sign-up";
// import ForgotPassword from "./pages/ForgotPassword";
// import Dashboard from "./pages/dashboard";
// import AdminDashboard from "./pages/admin/adminDashboard";

// import ProtectedRoute from "./routes/ProtectedRoute"; 

// export default function App() {
//   const [activeMenu, setActiveMenu] = useState("home");

//   return (
//     <Router>
//       <Routes>

//         {}
//         <Route
//           path="/"
//           element={
//             <>
//               <Navbar />
//               <Home setActiveMenu={setActiveMenu} />
//             </>
//           }
//         />

//         {}
//         <Route
//           path="/sant/:name"
//           element={
//             <>
//               <SantNavbar
//                 onMenuClick={setActiveMenu}
//                 activeMenu={activeMenu}
//               />
//               <SantDashboard
//                 activeMenu={activeMenu}
//                 setActiveMenu={setActiveMenu}
//               />
//             </>
//           }
//         />

//         {}
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {}
//         <Route
//           path="/adminDashboard"
//           element={
//             <ProtectedRoute role="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>
//     </Router>
//   );
// }

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";
import SantNavbar from "./components/sant-navbar";
import Navbar from "./components/navbar";
import "../styles/globals.css";
import Footer from "./components/footer"; 

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("home");

  const isSantRoute = router.pathname.startsWith("/sant");

  return (
    <>
      {isSantRoute ? (
        <SantNavbar
          onMenuClick={setActiveMenu}
          activeMenu={activeMenu}
        />
      ) : (
        <Navbar />
      )}

      <Component
        {...pageProps}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      

    </>
  );
}