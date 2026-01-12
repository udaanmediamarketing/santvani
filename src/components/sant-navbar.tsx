"use client";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";

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
  const [mobileMenu, setMobileMenu] = useState(false);

  const router = useRouter();

  const handleSantChange = (sant: string) => {
    setSelectedSant(sant);
    setShowSantDropdown(false);
    setMobileMenu(false);
    onMenuClick("home");
    router.push(`/sant/${sant.toLowerCase()}`);
  };

  return (
    <nav className="bg-orange-500 shadow-md text-white px-4 sm:px-6 py-3 relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            onMenuClick("home");
            router.push("/");
          }}
        >
          <img src="/images/logo.jpg" alt="SantVani Logo" className="h-9 w-auto" />
          <span className="text-lg font-bold whitespace-nowrap hidden sm:block">
            विश्व संत साहित्य
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-3 items-center">
          {/* Sant Dropdown */}
          <div className="relative">
            <Button variant="ghost" className="text-white" onClick={() => setShowSantDropdown(!showSantDropdown)}>
              {selectedSant} ▾
            </Button>
            {showSantDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                {sants.map((sant) => (
                  <button key={sant} className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleSantChange(sant)}>
                    {sant}
                  </button>
                ))}
              </div>
            )}
          </div>

          {[{ key: "Videos", label: "व्हिडिओ" }, { key: "Blogs", label: "लेख" }, { key: "Photos", label: "छायाचित्रे" }, { key: "About", label: "माहिती" }, { key: "Help", label: "मदत" }].map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              className={`text-white hover:bg-white/20 ${activeMenu === item.key ? "bg-white/20" : ""}`}
              onClick={() => onMenuClick(item.key)}
            >
              {item.label}
            </Button>
          ))}

          {/* Organization Dropdown */}
          <div className="relative">
            <Button variant="ghost" className="text-white" onClick={() => setShowOrgDropdown(!showOrgDropdown)}>
              संस्था ▾
            </Button>
            {showOrgDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                {organizations.map((org) => (
                  <button key={org} className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setShowOrgDropdown(false)}>
                    {org}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden mt-4 bg-orange-600 rounded-lg p-4 space-y-2">
          <div className="space-y-1">
            {sants.map((sant) => (
              <button key={sant} className="block w-full text-left" onClick={() => handleSantChange(sant)}>
                {sant}
              </button>
            ))}
          </div>

          <div className="border-t pt-2 space-y-1">
            {[{ key: "Videos", label: "व्हिडिओ" }, { key: "Blogs", label: "लेख" }, { key: "Photos", label: "छायाचित्रे" }, { key: "About", label: "माहिती" }, { key: "Help", label: "मदत" }].map((item) => (
              <button key={item.key} className="block w-full text-left" onClick={() => { onMenuClick(item.key); setMobileMenu(false); }}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t pt-2 space-y-1">
            {organizations.map((org) => (
              <button key={org} className="block w-full text-left" onClick={() => setMobileMenu(false)}>
                {org}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SantNavbar;
