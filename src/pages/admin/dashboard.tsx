"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<unknown[]>([]);
  const [users, setUsers] = useState<unknown[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/signin");
      return;
    }

    // fetch logic unchanged
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🧘‍♂️ Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        <button onClick={() => router.replace("/admin/manage-posts")} className="px-6 py-2 rounded-full bg-blue-600 text-white shadow">
          Manage Posts / Articles
        </button>
        <button onClick={() => router.replace("/admin/manage-users")}className="px-6 py-2 rounded-full bg-gray-200 text-gray-700">
          Manage Users
        </button>
      </div>

      {/* Content placeholder */}
      <div className="text-center text-gray-500">
        Admin content goes here…
      </div>
    </div>
  );
}