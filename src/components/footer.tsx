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
          <Link href="/about">
            <span className="hover:underline hover:text-gray-300 transition cursor-pointer">
              About
            </span>
          </Link>

          <Link href="/privacy-policy">
            <span className="hover:underline hover:text-gray-300 transition cursor-pointer">
              Privacy Policy
            </span>
          </Link>

          <Link href="/contact">
            <span className="hover:underline hover:text-gray-300 transition cursor-pointer">
              Contact
            </span>
          </Link>
        </nav>

        {/* Copyright (Ending Portion) */}
        <p className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} विश्व संत साहित्य. All rights reserved.
        </p>
      </div>
    </footer>
  );
}