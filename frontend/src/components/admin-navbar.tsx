"use client";

import { useRouter } from "next/router";

type Props = {
  active: "users" | "posts" | "organizations";
  onLogout: () => void;
};

export function AdminTopNav({ active, onLogout }: Props) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">
      <div className="flex gap-3">
        <button
          onClick={() => router.push("/admin/manage-users")}
          className={`px-5 py-2 rounded-lg font-medium ${
            active === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Manage Users
        </button>

        <button
          onClick={() => router.push("/admin/manage-posts")}
          className={`px-5 py-2 rounded-lg font-medium ${
            active === "posts"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Manage Posts
        </button>

        <button
          onClick={() => router.push("/admin/manage-orgs")}
          className={`px-5 py-2 rounded-lg font-medium ${
            active === "posts"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Manage Organizations
        </button>

      </div>

      <button
        onClick={() => router.push("/")}
        className="bg-orange-400 text-white px-4 py-2 rounded-lg"
      >
        Home
      </button>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}