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

export default function Footer() {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchText(value);

    // 🔥 frontend-only global search (Home.tsx listens)
    window.dispatchEvent(
      new CustomEvent("footer-search", {
        detail: value,
      })
    );
  };

  function handleCategorySelect(category: string): void {
    window.dispatchEvent(
      new CustomEvent("footer-category", {
        detail: category,
      })
    );
  }

  return (
    <footer className="bg-black p-6 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">

        {/* 🔍 SEARCH + CATEGORY (LEFT) */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchText}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="
              px-3 py-2
              rounded-md
              text-black
              text-sm
              outline-none
              focus:ring-2
              focus:ring-orange-400
            "
          />

          <CategoryList
            onSelectCategory={handleCategorySelect}
            layout="vertical"
          />
        </div>

        {/* 🌐 SOCIAL + LINKS (CENTER) */}
        <div className="flex flex-col items-center gap-4">
          {/* Social Media */}
          <div className="flex space-x-12">
            <a href="#" className="hover:text-gray-300 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <X size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <Youtube size={20} />
            </a>
          </div>

          {/* Footer Links (Below Social Icons) */}
          <nav className="flex space-x-12">
            <Link href="/about" className="hover:underline hover:text-gray-300 transition">
              About
            </Link>
            <Link href="/privacy-policy" className="hover:underline hover:text-gray-300 transition">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:underline hover:text-gray-300 transition">
              Contact
            </Link>
          </nav>
        </div>

        {/* © COPYRIGHT (RIGHT-BOTTOM) */}
        <div className="flex items-end justify-end">
          <p className="text-sm text-gray-400 text-right">
            © {new Date().getFullYear()} विश्व संत साहित्य. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
