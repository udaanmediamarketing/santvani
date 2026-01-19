import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { X } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-black p-4 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between text-white">

        {/* Social Media Icons (Starting Portion) */}
        <div className="flex space-x-12 mb-3 md:mb-0">
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

        {/* Footer Links (Middle Portion) */}
        <nav className="flex space-x-20 mb-2 md:mb-0">
          <a href="/about" className="hover:underline hover:text-gray-300 transition">
            About
          </a>
          <a href="/privacy-policy" className="hover:underline hover:text-gray-300 transition">
            Privacy Policy
          </a>
          <a href="/contact" className="hover:underline hover:text-gray-300 transition">
            Contact
          </a>
        </nav>

        {/* Copyright (Ending Portion) */}
        <p className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} विश्व संत साहित्य. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
