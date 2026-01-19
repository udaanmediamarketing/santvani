"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "../components/ui/button";
import { LogIn, Settings } from "lucide-react";
import UserProfileDropdown from "./userprofile";
import { useAuth } from "../pages/context/AuthContext";

const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];
const languages = ["इंग्रजी", "हिंदी", "मराठी"];

// Helper hook for client-only rendering
const useIsClient = () => {
  return useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );
};

const Navbar = () => {
  const { user, loading } = useAuth();
  const isClient = useIsClient();

  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLang, setSelectedLang] = useState("मराठी");

  useEffect(() => {
    if (isClient) {
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode, isClient]);

  return (
    <div className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center relative">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <img src="/images/logo.jpg" alt="SantVani Logo" className="h-10" />
        <span className="font-bold">विश्व संत साहित्य</span>
      </Link>

      <div className="flex gap-3 items-center">
        <Link href="/">
          <Button variant="secondary">मुखपृष्ठ</Button>
        </Link>

        {/* {sants.map((sant) => (
          <Link key={sant} href={`/sant/${sant}`}>
            <Button variant="ghost">{sant}</Button>
          </Link>
        ))} */}


        <Link href="/vertical-list">
          <Button variant="secondary">प्रकाशने</Button>
        </Link>
        <Link href="/sahitya">
          <Button variant="secondary">साहित्य</Button>
        </Link>
        <Link href="/navbar/granth">
          <Button variant="secondary">ग्रंथ</Button>
        </Link>
        <Link href="/navbar/gallery">
          <Button variant="secondary">गॅलरी</Button>
        </Link>



        <Link href="/create-article">
          <Button variant="secondary">लेख तयार करा</Button>
        </Link>

        <Link href="/create-organization">
          <Button variant="secondary">संस्था / केंद्र नोंदवा</Button>
        </Link>

        {/* Auth UI (rendered once) */}
        {isClient &&
          (loading ? (
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
          ))}


      </div>
    </div>
  );
};

export default Navbar;