"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { AdminTopNav } from "../../components/admin-navbar";

type Organization = {
  id: number;
  org_name: string;
  org_type?: string | null;
  head_name: string;
  status: "pending" | "published" | "rejected";
  created_at: string;
};

export default function ManageOrganizations() {
  const { user, token, logout } = useAuth();
  const router = useRouter();

  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ORGS_PER_PAGE = 5;

  // 🔍 Search
  const filteredOrgs = orgs?.filter((org) =>
    `${org.org_name} ${org.head_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // 📄 Pagination
  const totalPages = Math.ceil(filteredOrgs?.length / ORGS_PER_PAGE);
  const startIndex = (currentPage - 1) * ORGS_PER_PAGE;
  const paginatedOrgs = filteredOrgs?.slice(
    startIndex,
    startIndex + ORGS_PER_PAGE
  );

  // 🔐 Admin guard
  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") {
      router.replace("/signin");
    }
  }, [user, router]);

  // 📡 Fetch organizations
  const fetchOrganizations = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:5000/api/admin/pending-orgs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setOrgs(data.posts);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load organizations");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  // ✅ Publish / Reject
  const updateStatus = async (
    id: number,
    status: "published" | "rejected"
  ) => {
    try {
      const endpoint =
        status === "published"
          ? `http://localhost:5000/api/admin/publish-org/${id}`
          : `http://localhost:5000/api/admin/reject-org/${id}`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed");

      toast.success(
        status === "published"
          ? "Organization published"
          : "Organization rejected"
      );

      fetchOrganizations();
    } catch {
      toast.error("Could not update organization status");
    }
  };

  const confirmReject = async () => {
    if (!selectedOrgId) return;

    await updateStatus(selectedOrgId, "rejected");
    setShowRejectModal(false);
    setSelectedOrgId(null);
  };

  if (loading) {
    return <div className="p-6">Loading organizations...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AdminTopNav active="organizations" onLogout={logout} />

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">
        <h1 className="text-xl font-bold">Manage Organizations</h1>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by org name or head..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded-lg w-72"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Organization</th>
              <th className="p-3">Type</th>
              <th className="p-3">Head</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrgs?.map((org) => (
              <tr key={org.id} className="border-b">
                <td className="p-3 font-medium">{org.org_name}</td>
                <td className="p-3">{org.org_type ?? "-"}</td>
                <td className="p-3">{org.head_name}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      org.status === "published"
                        ? "bg-green-100 text-green-700"
                        : org.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {org.status}
                  </span>
                </td>
                <td className="p-3">
                  {org.status === "pending" ? (
                    <div className="space-x-2">
                      <button
                        onClick={() =>
                          updateStatus(org.id, "published")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Publish
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOrgId(org.id);
                          setShowRejectModal(true);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm capitalize">
                      {org.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </p>

        <div className="space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && selectedOrgId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">
              Reject this organization?
            </h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone.
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
                className="bg-red-600 text-white px-6 py-2 rounded-lg"
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