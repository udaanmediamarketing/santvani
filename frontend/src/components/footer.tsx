"use client";

import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Youtube, X } from "lucide-react";
import Link from "next/link";
import FooterCategory from "./footer-category";
import SantHorizontalGrid from "./cards/horizontal-vertical-cards";
import SearchModal from "./search-modal";
import { cn } from "../lib/utils";
import { Post } from "../types/post";

interface FooterProps {
  posts?: Post[];
}

export default function Footer({ posts = [] }: FooterProps) {
  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  // Filter posts based on search query
  const filteredResults = searchText.trim() === ""
    ? []
    : posts.filter((post) =>
      `${post.title} ${post.category ?? ""}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

  // Modal open state derived from `searchText` to avoid setState in effect

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    window.dispatchEvent(new CustomEvent("footer-search", { detail: value }));
  };

  const handleCategorySelect = (category: string) => {
    window.dispatchEvent(new CustomEvent("footer-category", { detail: category }));
  };

  return (
  // Reduced overall vertical padding from pt-8 pb-4 to pt-4 pb-2
  <footer className="bg-[#1a162e] text-white px-10 pt-4 pb-2 font-sans">
    
    {/* TOP SECTION: Reduced gap from 8 to 4, and bottom margin from 10 to 4 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      
      {/* COLUMN 1: Reduced gap between Category and Search from 6 to 2 */}
      <div className="flex flex-col gap-2 ml-14">
        <div className="w-full">
          <FooterCategory onSelectCategory={handleCategorySelect} />
        </div>

        {/* Reduced space-y from 3 to 1 */}
        <div className="space-y-1 pl-3">
          <h2 className="text-white text-sm font-bold uppercase tracking-wider border-b border-gray-700 pb-0.5">
            Search This Blog
          </h2>
          {/* Maintained h-9 for accessibility, but tightened the surrounding box */}
          <div className="flex h-10 mt-6">
            <input
              type="text"
              placeholder="Search this blog"
              value={searchText}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="flex-1 px-6 bg-transparent border border-gray-700 bg-[#2d2845] text-sm focus:outline-none"
            />
             <button className="bg-orange-600 px-5 text-[10px] font-bold uppercase tracking-widest hover:bg-[#5000c2] transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* COLUMN 2 & 3: Reduced header margin-bottom from 4 to 2 */}
      <div>
        <h2 className="text-white text-sm font-bold uppercase tracking-wider border-b border-gray-700 mt-7 pb-2">
          Gadgets News
        </h2>
        <SantHorizontalGrid 
          imageWidth="w-20" 
          imageHeight="h-17" 
          cardLayout="row" 
          variant="side" 
          imageFit='cover' 
          bgWhite={false}
          size="text-md"
        />
      </div>

      <div>
        <h2 className="text-white text-sm font-bold uppercase tracking-wider border-b border-gray-700 mt-7 pb-2">
          Tech Life
        </h2>
        <SantHorizontalGrid 
          imageWidth="w-20" 
          imageHeight="h-17" 
          cardLayout="row" 
          variant="side" 
          imageFit='cover' 
          bgWhite={false}
          text="white"
          size="text-md"
        />
      </div>
    </div>

    {/* MIDDLE SECTION: Reduced pt from 6 to 3, gap to 4, and mb from 6 to 3 */}
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start mb-3">
      <div className="flex gap-2 max-w-2xl ml-14">
        <img src="images/footer_about.png" alt="Logo" className="w-10 h-10 object-contain self-start" />
        <div>
          <h2 className="text-white text-md font-bold uppercase mb-0.5">About Us</h2>
          <p className="text-gray-400 text-md leading-tight line-clamp-2">
            News Blogger Template is Designed Theme for Giving Enhanced look Various Features are available Which is designed in User friendly to handle by Piki Developers.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start mr-30">
        <h2 className="text-white text-md font-semibold font-bold uppercase mb-3">Follow Us</h2>
        <div className="flex gap-3">
          <SocialIcon bg="bg-[#3b5998]" icon={<Facebook size={24} fill="white" />} />
          <SocialIcon bg="bg-[#000000]" icon={<X size={24} />} />
          <SocialIcon bg="bg-[#cd201f]" icon={<Youtube size={24} fill="white" />} />
          <SocialIcon bg="bg-[#e4405f]" icon={<Instagram size={24} />} />
        </div>
      </div>
    </div>

    {/* BOTTOM BAR: Reduced pt from 4 to 2 */}
    <div className="border-t border-gray-800 pt-2 flex flex-col md:flex-row justify-between items-center gap-2 text-white uppercase tracking-tight">
      <div className="flex gap-3 text-sm ml-14">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
      </div>
      <p className="text-[12px] mr-30">
       All Right Reserved Copyright © vishwsantsahitya.com {new Date().getFullYear()} 
      </p>
    </div>

    {/* Search Modal */}
    <SearchModal
      isOpen={searchText.trim() !== ""}
      onClose={() => {
        setSearchText("");
      }}
      query={searchText}
      results={filteredResults}
      isLoading={searchLoading}
    />
  </footer>
);
}

function SocialIcon({ bg, icon }: { bg: string, icon: React.ReactNode }) {
  return (
    <a href="#" className={cn("w-8 h-8 flex items-center justify-center text-white transition-opacity hover:opacity-80", bg)}>
      {icon}
    </a>
  );
}