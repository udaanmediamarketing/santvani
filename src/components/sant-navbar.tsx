"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";
import { _Translator } from "next-intl";

interface SantNavbarProps {
  onMenuClick: React.Dispatch<React.SetStateAction<string>>;
  activeMenu?: string;
  t: _Translator; // Add this line
}

const SantNavbar = ({ onMenuClick, activeMenu, t }: SantNavbarProps) => {
  const sants = ["Tukaram", "Eknath", "Namdev", "Dnyaneshwar"];
  const organizations = ["SantSamaj", "BhaktMandal", "DharmikSangh"];

  const [selectedSant, setSelectedSant] = useState(sants[0]);
  const [showSantDropdown, setShowSantDropdown] = useState(false);
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);

  const router = useRouter();

  const handleSantChange = (sant: string) => {
    setSelectedSant(sant);
    setShowSantDropdown(false);
    onMenuClick("home");
    router.push(`/sant/${sant.toLowerCase()}`); // ✅ Next.js navigation
  };

  return (
    <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center relative">
      <h1 className="text-xl font-bold tracking-wide">🕉️ SantVani</h1>

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
        {["home", "Videos", "Blogs", "Photos", "About", "Help"].map((link) => (
          <Button
            key={link}
            variant={activeMenu === link ? "default" : "ghost"}
            className={`text-white hover:bg-white/20 ${
              activeMenu === link ? "bg-white/20" : ""
            }`}
            onClick={() => onMenuClick(link)}
          >
            {link}
          </Button>
        ))}

        {/* Organizations Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setShowOrgDropdown(!showOrgDropdown)}
          >
            Organizations ▾
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