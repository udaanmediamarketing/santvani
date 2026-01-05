// "use client";

// import Link from "next/link";
// import { Button } from "../components/ui/button";
// import { LogIn } from "lucide-react";

// const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];

// const Navbar = () => {
//   return (
//     <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center">
//       <h1 className="text-xl font-bold tracking-wide">🕉️ संतवाणी</h1>

//       <div className="flex gap-3">
//         <Link href="/">
//           <Button variant="secondary" className="text-white hover:bg-gray-100 hover:text-black">
//             मुख्य पान
//           </Button>
//         </Link>

//         {sants.map((sant) => (
//           <Link key={sant} href={`/sant/${sant}`}>
//             <Button variant="ghost" className="text-white hover:bg-white/20">
//               {sant}
//             </Button>
//           </Link>
//         ))}

//         <Link href="/create-article">
//           <Button variant="secondary" className="text-white hover:bg-white/20">
//             लेख तयार करा
//           </Button>
//         </Link>

//         <Link href="/list-articles">
//           <Button variant="secondary" className="text-white hover:bg-white/20">
//             लेखांची यादी
//           </Button>
//         </Link>

//         <Link href="/signin">
//           <Button
//             variant="secondary"
//             className="bg-white text-orange-600 font-semibold hover:bg-gray-100 flex items-center gap-2 transition-all duration-200"
//           >
//             <LogIn size={18} />
//             Sign In
//           </Button>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { LogIn, Settings, Sun, Moon } from "lucide-react";

const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];
const languages = ["इंग्रजी", "हिंदी", "मराठी"];

const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLang, setSelectedLang] = useState("Marathi");

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

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
          <Button variant="secondary" className="text-white hover:bg-gray-100 hover:text-black">
            मुख्य पान
          </Button>
        </Link>

        {sants.map((sant) => (
          <Link key={sant} href={`/sant/${sant}`}>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              {sant}
            </Button>
          </Link>
        ))}

        <Link href="/create-article">
          <Button variant="secondary" className="text-white hover:bg-white/20">
            लेख तयार करा
          </Button>
        </Link>

        <Link href="/list-articles">
          <Button variant="secondary" className="text-white hover:bg-white/20">
            लेखांची यादी
          </Button>
        </Link>

        <Link href="/signin">
          <Button
            variant="secondary"
            className="bg-white text-orange-600 font-semibold hover:bg-gray-100 flex items-center gap-2 transition-all duration-200"
          >
            <LogIn size={18} />
            Sign In
          </Button>
        </Link>

        {/* ⚙️ SETTINGS */}
        <div className="relative">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 p-2"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={20} />
          </Button>

          {showSettings && (
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
