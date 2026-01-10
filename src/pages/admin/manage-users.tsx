"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { AdminTopNav } from "../../components/admin-navbar";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export default function ManageUsers() {
  const { user, token, logout } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const confirmReject = async () => {
  if (!selectedUserId) return;

  await updateStatus(selectedUserId, "rejected");

  toast.success("User rejected", {
    description: "The user has been rejected successfully.",
  });
  fetchUsers()
  setShowRejectModal(false);
  setSelectedUserId(null);
};

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") {
      router.replace("/signin");
    }
  }, [user, router]);

  const fetchUsers = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/admin/pending-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateStatus = async (
  id: number,
  status: "approved" | "rejected"
) => {
  try {
     const endpoint = status === "approved" 
    ? `http://localhost:5000/api/admin/approve-user/${id}` 
    : `http://localhost:5000/api/admin/reject-user/${id}`
  
    const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) throw new Error("Failed to update status");

    if (status === "approved") {
      toast.success("User approved", {
        description: "The user has been successfully approved.",
      });
    }

    fetchUsers();
  } catch (error) {
    toast.error("Something went wrong", {
      description: "Could not update user status.",
    });
  }
};

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AdminTopNav active="users" onLogout={logout} />
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">
        <h1 className="text-xl font-bold">Manage Users</h1>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      u.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : u.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
               <td className="p-3">
  {u.status === "pending" && (
    <div className="space-x-2">
      <button
        onClick={() => updateStatus(u.id, "approved")}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Approve
      </button>
      <button onClick={() => { setSelectedUserId(u.id); setShowRejectModal(true); }} className="bg-red-500 text-white px-3 py-1 rounded" > Reject </button>

    </div>
  )}

  {u.status === "approved" && (
    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
      Approved
    </span>
  )}

  {u.status === "rejected" && (
    <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
      Rejected
    </span>
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{showRejectModal && selectedUserId && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="bg-white/95 backdrop-blur-sm border rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
      <h3 className="text-lg font-semibold mb-2">Reject this user?</h3>
      <p className="text-gray-600 mb-6">
        This action cannot be undone. The user will lose access to the system.
      </p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => setShowRejectModal(false)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={confirmReject}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Yes, Reject
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}