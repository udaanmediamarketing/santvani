

import Navbar from "../components/navbar";
import Home from "../components/home";
import { useState } from "react";

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}