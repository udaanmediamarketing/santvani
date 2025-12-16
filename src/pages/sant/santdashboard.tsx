"use client";

import { useRouter } from "next/router";

interface SantDashboardProps {
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function SantDashboard({ activeMenu }: SantDashboardProps) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div className="min-h-screen bg-[#def1de] p-6 text-center">
      {activeMenu === "home" && (
        <p className="text-4xl text-amber-600 mt-4">
           {`Welcome to ${name}'s Dashboard`}
        </p>
      )}
    </div>
  );
}