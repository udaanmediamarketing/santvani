'use client'
import { useRouter } from "next/router";import React, { useState } from "react";
import SantNavbar from "../../components/sant-navbar";
import SantDashboard from "../../components/sant/santdashboard";

export default function SantPage() {
  const router = useRouter();
  const { name } = router.query;
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <>
      <SantNavbar onMenuClick={setActiveMenu} activeMenu={activeMenu}/>
      <SantDashboard activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
    </>
  );
}