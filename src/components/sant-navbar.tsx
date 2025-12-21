// "use client";
// import { useState } from "react";
// import { Button } from "../components/ui/button";
// import { useRouter } from "next/router";

// interface SantNavbarProps {
//   onMenuClick: (menu: string) => void;
//   activeMenu?: string;
// }

// const SantNavbar = ({ onMenuClick, activeMenu }: SantNavbarProps) => {
//   const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];
//   const organizations = ["संत समाज", "भक्त मंडळ", "धार्मिक संघ"];

//   const [selectedSant, setSelectedSant] = useState(sants[0]);
//   const [showSantDropdown, setShowSantDropdown] = useState(false);
//   const [showOrgDropdown, setShowOrgDropdown] = useState(false);
//   const router = useRouter();

//   const handleSantChange = (sant: string) => {
//     setSelectedSant(sant);
//     setShowSantDropdown(false);
//     onMenuClick("home");
//     router.push(`/sant/${sant.toLowerCase()}`);
//   };

//   return (
//     <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center relative">
//       <h1 className="text-xl font-bold tracking-wide">🕉️ संतवाणी</h1>

//       <div className="flex gap-4 items-center">

//         {/* Sant Dropdown */}
//         <div className="relative">
//           <Button
//             variant="ghost"
//             className="text-white hover:bg-white/20"
//             onClick={() => setShowSantDropdown(!showSantDropdown)}
//           >
//             {selectedSant} ▾
//           </Button>

//           {showSantDropdown && (
//             <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
//               {sants.map((sant) => (
//                 <button
//                   key={sant}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                   onClick={() => handleSantChange(sant)}
//                 >
//                   {sant}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Main Menu in Marathi */}
//         {[
//           { key: "Videos", label: "व्हिडिओ" },
//           { key: "Blogs", label: "लेख" },
//           { key: "Photos", label: "छायाचित्रे" },
//           { key: "About", label: "माहिती" },
//           { key: "Help", label: "मदत" },
//         ].map((item) => (
//           <Button
//             key={item.key}
//             variant={activeMenu === item.key ? "default" : "ghost"}
//             className={`text-white hover:bg-white/20 ${
//               activeMenu === item.key ? "bg-white/20" : ""
//             }`}
//             onClick={() => onMenuClick(item.key)}
//           >
//             {item.label}
//           </Button>
//         ))}

//         {/* Organizations Dropdown */}
//         <div className="relative">
//           <Button
//             variant="ghost"
//             className="text-white hover:bg-white/20"
//             onClick={() => setShowOrgDropdown(!showOrgDropdown)}
//           >
//             संस्था ▾
//           </Button>

//           {showOrgDropdown && (
//             <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
//               {organizations.map((org) => (
//                 <button
//                   key={org}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                   onClick={() => {
//                     onMenuClick(org);
//                     setShowOrgDropdown(false);
//                   }}
//                 >
//                   {org}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default SantNavbar;
"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";

interface SantNavbarProps {
  onMenuClick: (menu: string) => void;
  activeMenu?: string;
}

const SantNavbar = ({ onMenuClick, activeMenu }: SantNavbarProps) => {
  const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];
  const organizations = ["संत समाज", "भक्त मंडळ", "धार्मिक संघ"];

  const [selectedSant, setSelectedSant] = useState(sants[0]);
  const [showSantDropdown, setShowSantDropdown] = useState(false);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const router = useRouter();

  const handleSantChange = (sant: string) => {
    setSelectedSant(sant);
    setShowSantDropdown(false);
    onMenuClick("home");
    router.push(`/sant/${sant.toLowerCase()}`);
  };

  return (
    <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center relative">

      {/* ✅ LOGO → HOME REDIRECT */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => {
          onMenuClick("home");
          router.push("/");
        }}
      >
        <img
          src="/images/logo.jpg"
          alt="SantVani Logo"
          className="h-10 w-auto object-contain"
        />

        <span className="text-lg font-bold tracking-wide whitespace-nowrap">
          विश्व संत साहित्य
        </span>
      </div>


      <div className="flex gap-4 items-center">

        {/* Sant Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setShowSantDropdown(!showSantDropdown)}
          >
            {selectedSant} ▾
          </Button>

          {showSantDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
              {sants.map((sant) => (
                <button
                  key={sant}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSantChange(sant)}
                >
                  {sant}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Menu */}
        {[
          { key: "Videos", label: "व्हिडिओ" },
          { key: "Blogs", label: "लेख" },
          { key: "Photos", label: "छायाचित्रे" },
          { key: "About", label: "माहिती" },
          { key: "Help", label: "मदत" },
        ].map((item) => (
          <Button
            key={item.key}
            variant={activeMenu === item.key ? "default" : "ghost"}
            className={`text-white hover:bg-white/20 ${activeMenu === item.key ? "bg-white/20" : ""
              }`}
            onClick={() => onMenuClick(item.key)}
          >
            {item.label}
          </Button>
        ))}

        {/* Organizations Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setShowOrgDropdown(!showOrgDropdown)}
          >
            संस्था ▾
          </Button>

          {showOrgDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
              {organizations.map((org) => (
                <button
                  key={org}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    onMenuClick(org);
                    setShowOrgDropdown(false);
                  }}
                >
                  {org}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default SantNavbar;
