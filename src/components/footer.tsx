// import React from "react";
// import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
// import { X } from "lucide-react";
// import Link from "next/link";
// import CategoryList from "./category-list";


// export default function Footer() {
//   function handleCategorySelect(category: string): void | Promise<void> {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <footer className="bg-black p-4 shadow-md">
//       <div className="flex flex-col md:flex-row items-center justify-between text-white">

//         <CategoryList onSelectCategory={handleCategorySelect} />

//         {/* Social Media Icons (Starting Portion) */}
//         <div className="flex space-x-12 mb-3 md:mb-0">
//           <a href="#" className="hover:text-gray-300 transition">
//             <Facebook size={20} />
//           </a>
//           <a href="#" className="hover:text-gray-300 transition">
//             <X size={20} />
//           </a>
//           <a href="#" className="hover:text-gray-300 transition">
//             <Instagram size={20} />
//           </a>
//           <a href="#" className="hover:text-gray-300 transition">
//             <Youtube size={20} />
//           </a>
//         </div>

//         {/* Footer Links (Middle Portion) */}
//         <nav className="flex space-x-20 mb-2 md:mb-0">
//           <Link href="/about">
//             <span className="hover:underline hover:text-gray-300 transition cursor-pointer">
//               About
//             </span>
//           </Link>

//           <Link href="/privacy-policy">
//             <span className="hover:underline hover:text-gray-300 transition cursor-pointer">
//               Privacy Policy
//             </span>
//           </Link>

//           <Link href="/contact">
//             <span className="hover:underline hover:text-gray-300 transition cursor-pointer">
//               Contact
//             </span>
//           </Link>
//         </nav>

//         {/* Copyright (Ending Portion) */}
//         <p className="text-sm text-gray-400 text-center">
//           © {new Date().getFullYear()} विश्व संत साहित्य. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

"use client";

import React, { useState } from "react";
import { Facebook, Instagram, Youtube, X } from "lucide-react";
import Link from "next/link";
import CategoryList from "./category-list";
import SantHorizontalGrid from "./cards/horizontal-vertical-cards";

export default function Footer() {
  const [searchText, setSearchText] = useState("");

  // 🔍 Frontend-only search (Home listens)
  const handleSearchChange = (value: string) => {
    setSearchText(value);
    window.dispatchEvent(
      new CustomEvent("footer-search", { detail: value })
    );
  };

  // 📂 Category select (Home listens)
  const handleCategorySelect = (category: string) => {
    window.dispatchEvent(
      new CustomEvent("footer-category", { detail: category })
    );
  };

  return (
    <footer className="bg-black text-white px-6 pt-6 pb-4">
      {/* 🔝 TOP + MIDDLE SECTION */}
      <div className="grid grid-cols-[auto_1fr_auto] gap-8 items-start">

        {/* 🔍 LEFT COLUMN */}
        <div className="flex flex-col gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchText}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="
        w-52
        px-4 py-2
        rounded-md
        bg-white
        text-black
        placeholder-gray-500
        text-sm
        border border-gray-300
        outline-none
        focus:ring-2
        focus:ring-orange-400
      "
          />

          {/* Category List */}
          <div
            className="
        w-44
        [&_div]:flex
        [&_div]:flex-col
        [&_div]:gap-2
        [&_button]:bg-transparent
        [&_button]:p-0
        [&_button]:text-left
        [&_button]:text-sm
        [&_button]:text-gray-300
        hover:[&_button]:text-gray-100
      "
          >
            <CategoryList onSelectCategory={handleCategorySelect} />
          </div>
        </div>

        {/* 🧾 SMALL HORIZONTAL CARD — SEARCH KE BAJU */}
        <div className="self-start pt-2 w-[170px] space-y-2">
          <SantHorizontalGrid cardLayout="row" variant="side" />
        </div>

        {/* 🌐 RIGHT BOTTOM — SOCIAL + COPYRIGHT */}
        <div className="flex flex-col items-end justify-end h-full">
          <div className="flex gap-6 mb-3">
            <a href="#" className="hover:text-gray-300 transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <X size={18} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <Youtube size={18} />
            </a>
          </div>

          <p className="text-sm text-gray-400 text-right">
            © {new Date().getFullYear()} विश्व संत साहित्य. All rights reserved.
          </p>
        </div>
      </div>

      {/* 🔽 BOTTOM CENTER LINKS */}
      <div className="mt-8 flex justify-center gap-10 text-sm text-gray-300">
        <Link href="/about" className="hover:text-white transition">
          About
        </Link>
        <Link href="/privacy-policy" className="hover:text-white transition">
          Privacy Policy
        </Link>
        <Link href="/contact" className="hover:text-white transition">
          Contact
        </Link>
      </div>

    </footer>
  );
}