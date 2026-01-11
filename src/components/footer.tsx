import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black p-4 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between text-white">

        {/* Footer Links */}
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


        {/* Copyright */}
        <p className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} विश्व संत साहित्य. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
