'use client'
import { useState } from "react";
import Navbar from "../components/navbar";
import Home from "../components/home";

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <>
      <Navbar />
      <Home setActiveMenu={setActiveMenu} />
    </>
  );
}