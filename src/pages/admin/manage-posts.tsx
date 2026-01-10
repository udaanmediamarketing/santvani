"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { AdminTopNav } from "../../components/admin-navbar";

type Post = {
  id: number;
  title: string;
  santname?: string;
  category?: string;
  author_name: string;
  status: "pending" | "published" | "rejected";
  created_at: string;
};

export default function ManagePosts() {
  const { user, token, logout } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);

const POSTS_PER_PAGE = 5;

const filteredPosts = posts?.filter((post) =>
  `${post.title} ${post.author_name}`
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);

// Pagination
const totalPages = Math.ceil(filteredPosts?.length / POSTS_PER_PAGE);
const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
const paginatedPosts = filteredPosts?.slice(
  startIndex,
  startIndex + POSTS_PER_PAGE
);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") {
      router.replace("/signin");
    }
  }, [user, router]);

  const fetchPosts = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:5000/api/admin/pending-posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      setPosts(data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const updateStatus = async (
    id: number,
    status: "published" | "rejected"
  ) => {
    try {
      const endpoint =
        status === "published"
          ? `http://localhost:5000/api/admin/publish-post/${id}`
          : `http://localhost:5000/api/admin/reject-post/${id}`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update post status");

      toast.success(
        status === "published" ? "Post published" : "Post rejected",
        {
          description: "Post status updated successfully.",
        }
      );

      fetchPosts();
    } catch (error) {
      toast.error("Something went wrong", {
        description: "Could not update post status.",
      });
    }
  };

  const confirmReject = async () => {
    if (!selectedPostId) return;

    await updateStatus(selectedPostId, "rejected");
    setShowRejectModal(false);
    setSelectedPostId(null);
  };

  if (loading) {
    return <div className="p-6">Loading posts...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AdminTopNav active="posts" onLogout={logout} />
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-6">
        <h1 className="text-xl font-bold">Manage Posts</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
  <input
    type="text"
    placeholder="Search by title or author..."
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // reset page on search
    }}
    className="border px-4 py-2 rounded-lg w-72"
  />
</div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Author</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="pl-2">
            {paginatedPosts?.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.category ?? p.santname}</td>
                <td className="p-3">{p.author_name}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      p.status === "published"
                        ? "bg-green-100 text-green-700"
                        : p.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  {p.status === "pending" && (
                    <div className="space-x-2">
                      <button
                        onClick={() => updateStatus(p.id, "published")}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Publish
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPostId(p.id);
                          setShowRejectModal(true);
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {p.status !== "pending" && (
                    <span className="text-gray-500 text-sm capitalize">
                      {p.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
      {showRejectModal && selectedPostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">
              Reject this post?
            </h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. The post will not be published.
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