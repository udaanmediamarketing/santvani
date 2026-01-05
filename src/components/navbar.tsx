// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Button } from "../components/ui/button";
// import { LogIn, Settings, Sun, Moon, User, LogOut } from "lucide-react";
// import { useAuth } from "../pages/context/AuthContext";
// import UserProfileDropdown from "./userprofile";

// const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];
// const languages = ["इंग्रजी", "हिंदी", "मराठी"];

// const Navbar = () => {
//   const { user, loading } = useAuth();

//   const [mounted, setMounted] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const [selectedLang, setSelectedLang] = useState("Marathi");

//   // ✅ Theme side effects only after mount
//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//   }, [darkMode]);

//   if (loading) {
//     return (
//       <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center">
//         <div className="h-10 w-32 bg-white/20 rounded animate-pulse" />
//         <div className="flex gap-3">
//           <div className="h-10 w-20 bg-white/20 rounded animate-pulse" />
//           <div className="h-10 w-10 bg-white/20 rounded-full animate-pulse" />
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center relative">
//       {/* Logo */}
//       <Link href="/" className="flex items-center gap-3">
//         <img src="/images/logo.jpg" alt="SantVani Logo" className="h-10" />
//         <span className="font-bold">विश्व संत साहित्य</span>
//       </Link>

//       <div className="flex gap-3 items-center">
//         <Link href="/">
//           <Button variant="secondary">मुख्य पान</Button>
//         </Link>

//         {sants.map((sant) => (
//           <Link key={sant} href={`/sant/${sant}`}>
//             <Button variant="ghost">{sant}</Button>
//           </Link>
//         ))}

//         <Link href="/create-article">
//           <Button variant="secondary">लेख तयार करा</Button>
//         </Link>

//         <Link href="/list-articles">
//           <Button variant="secondary">लेखांची यादी</Button>
//         </Link>

//         {/* Auth-safe rendering */}
//         {user ? (
//           <UserProfileDropdown user={user} />
//         ) : (
//           <Link href="/signin">
//             <Button variant="secondary" className="bg-white text-orange-600">
//               <LogIn size={18} />
//               Sign In
//             </Button>
//           </Link>
//         )}

//         {/* Settings */}
//         <Button variant="ghost" onClick={() => setShowSettings(!showSettings)}>
//           <Settings />
//         </Button>

//         {showSettings && (
//           <div className="absolute right-0 top-14 bg-white text-black rounded-lg p-3 shadow-xl">
//             <p className="font-semibold mb-2">🌐 भाषा</p>
//             {languages.map((lang) => (
//               <button
//                 key={lang}
//                 className="block w-full text-left px-2 py-1 hover:bg-gray-100"
//                 onClick={() => setSelectedLang(lang)}
//               >
//                 {lang}
//               </button>
//             ))}

//             <div className="flex justify-between items-center mt-3">
//               <span>Theme</span>
//               <button onClick={() => setDarkMode(!darkMode)}>
//                 {darkMode ? <Sun /> : <Moon />}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar; 
"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "../components/ui/button";
import { LogIn, Settings, Sun, Moon } from "lucide-react";
import { useAuth } from "../pages/context/AuthContext";
import UserProfileDropdown from "./userprofile";

const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];
const languages = ["इंग्रजी", "हिंदी", "मराठी"];

// Helper hook for client-only rendering (React 19 compatible)
const useIsClient = () => {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
};

const Navbar = () => {
  const { user, loading } = useAuth();
  const isClient = useIsClient();
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLang, setSelectedLang] = useState("Marathi");
  // ✅ Theme side effects
  useEffect(() => {
    if (isClient && typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode, isClient]);

  return (
    <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center relative">

      {/* LOGO + TITLE */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <img
          src="/images/logo.jpg"
          alt="SantVani Logo"
          className="h-10 w-auto object-contain"
        />
        <span className="text-lg font-bold tracking-wide whitespace-nowrap">
          विश्व संत साहित्य
        </span>
      </Link>

      <div className="flex gap-3 items-center">
        <Link href="/">
          <Button variant="secondary">मुख्य पान</Button>
        </Link>

        {sants.map((sant) => (
          <Link key={sant} href={`/sant/${sant}`}>
            <Button variant="ghost">{sant}</Button>
          </Link>
        ))}

        <Link href="/create-article">
          <Button variant="secondary">लेख तयार करा</Button>
        </Link>

        <Link href="/list-articles">
          <Button variant="secondary">लेखांची यादी</Button>
        </Link>

        {/* Only render auth UI on client after hydration */}
        {isClient && (
          loading ? (
            <div className="h-10 w-24 bg-white/20 rounded animate-pulse" />
          ) : user ? (
            <UserProfileDropdown user={user} />
          ) : (
            <Link href="/signin">
              <Button variant="secondary" className="bg-white text-orange-600">
                <LogIn size={18} />
                Sign In
              </Button>
            </Link>
          )
        )}

        {/* Settings */}
        <Button variant="ghost" onClick={() => setShowSettings(!showSettings)}>
          <Settings />
        </Button>

          {showSettings && isClient &&  (
            <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-xl z-50 p-3 space-y-3">

              {/* Language */}
              <div>
                <p className="text-sm font-semibold mb-1">🌐 भाषा</p>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className={`block w-full text-left px-3 py-1 rounded hover:bg-gray-100 ${selectedLang === lang ? "font-semibold text-orange-600" : ""
                      }`}
                    onClick={() => setSelectedLang(lang)}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center justify-between border-t pt-2">
                <span className="text-sm font-medium">Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {/* Next Page */}
              <div className="border-t pt-2">
                <Link href="/PageTranslate">
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm font-medium">
                    🔁 Next Page (Translate)
                  </button>
                </Link>
              </div>

            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;