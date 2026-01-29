import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { Settings, User, LogOut, LayoutDashboard, BookOpen, Landmark } from "lucide-react";

type UserProfileDropdownProps = {
  user: {
    name?: string;
    email?: string;
    role?: "admin" | "user";
  };
};

const getInitials = (name?: string) => {
  if (!name) return "व";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const UserProfileDropdown = ({ user }: UserProfileDropdownProps) => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Avatar Button */}
      <Button
        variant="ghost"
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 rounded-full p-0 hover:bg-orange-100 ring-1 ring-orange-200 transition"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="w-7 h-7 rounded-full bg-orange-600 text-white text-sm font-semibold flex items-center justify-center">
          {getInitials(user.name)}
        </div>
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-54 bg-white text-black rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
          
          {/* Header */}
          <div className="flex items-center gap-4 px-4 py-4 border-b bg-gray-50">
            <div className="w-12 h-12 rounded-full bg-orange-600 text-white font-semibold flex items-center justify-center shrink-0">
              {getInitials(user.name)}
            </div>

            <div className="min-w-0">
              <p className="font-medium text-sm truncate">
                {user.name || "वापरकर्ता"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user.email}
              </p>
            </div>
          </div>

          {/* Menu */}
<div className="py-1">
  <Link
    href="/user/profile"
    onClick={() => setOpen(false)}
    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition"
  >
    <User size={16} className="text-gray-500" />
    माझी प्रोफाइल
  </Link>

  {/* Admin Dashboard (only for admin) */}
  {user.role === "admin" && (
    <Link
      href="/admin/manage-users"
      onClick={() => setOpen(false)}
      className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition"
    >
      <LayoutDashboard size={16} className="text-gray-500" />
      अ‍ॅडमिन डॅशबोर्ड
    </Link>
  )}

  <Link
    href="/list-articles"
    onClick={() => setOpen(false)}
    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition"
  >
    <BookOpen size={16} className="text-gray-500" />
    लेखांची यादी
  </Link>


  <Link
    href="/list-orgs"
    onClick={() => setOpen(false)}
    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition"
  >
    <Landmark size={16} className="text-gray-500" />
    संस्था / उपक्रमांची यादी
  </Link>

  <Link
    href="/settings"
    onClick={() => setOpen(false)}
    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-100 transition"
  >
    <Settings size={16} className="text-gray-500" />
    सेटिंग्स
  </Link>
</div>

          {/* Logout */}
          <div className="border-t">
            <button
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              <LogOut size={16} />
              लॉग आउट
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;