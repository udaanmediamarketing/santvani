"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "../components/ui/button";
import { LogIn, Settings } from "lucide-react";
import UserProfileDropdown from "./userprofile";
import { useAuth } from "../context/AuthContext";
import { Post } from "../types/post";
import PrakashaneHoverCards from './cards/prakashane-hover-cards';
import { Search } from "lucide-react";
import SearchModal from "./search-modal";

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
interface NavbarProps {
  posts?: Post[];
}

const Navbar = ({ posts = [] }: NavbarProps) => {
  const { user, loading } = useAuth();
  const isClient = useIsClient();

  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLang, setSelectedLang] = useState("मराठी");
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (isClient) {
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode, isClient]);

  // Filter posts based on search query
  const filteredResults = search.trim() === ""
    ? []
    : posts.filter((post) =>
      `${post.title} ${post.category ?? ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // Modal open state is derived from `search` value to avoid setState in effect

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

        {/* प्रकाशने Hover Dropdown */}
        <div className="relative inline-block group">

          <Link href="/vertical-list">
            <Button variant="secondary">प्रकाशने</Button>
          </Link>

          {/* Hover Grid */}
          <div className="absolute left-0 mt-2 w-[600px] hidden group-hover:block bg-white shadow-lg p-4 z-50">
            <PrakashaneHoverCards posts={posts} />
          </div>

        </div>

        <Link href="/navbar/sahitya">
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

        <div className="relative w-48">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="सर्च करा..."
            className="w-full pl-9 pr-3 py-1.5 rounded-full bg-white text-black border border-orange-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 transition-all duration-200"
          />
        </div>

        {/* Auth UI */}
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

      {/* Search Modal */}
      <SearchModal
        isOpen={search.trim() !== ""}
        onClose={() => {
          setSearch("");
        }}
        query={search}
        results={filteredResults}
        isLoading={searchLoading}
      />
    </div>
  );
};

export default Navbar;