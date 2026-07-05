"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { AdminTopNav } from "../../components/admin-navbar";
import { slugify } from "@/src/lib/helper";
import Image from "next/image";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type Post = {
  id: number;
  title: string;
  santname?: string;
  category?: string;
  author_name: string;
  status: "pending" | "published" | "rejected";
  created_at: string;
};

type EditPostData = {
  id: string;
  title: string;
  santname: string;
  category: string;
  content: string;
  image_url: string | null;
  youtube_url: string;
  slug: string;
};

const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];
const categories = ["किर्तन", "भजन", "श्लोक", "सामुदायिक ध्यान", "सामुदायिक प्रार्थना"];

export default function ManagePosts() {
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState<EditPostData | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    santname: "",
    category: "",
    content: "",
    youtubeUrl: "",
  });
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const POSTS_PER_PAGE = 5;

  const filteredPosts = posts?.filter((post) =>
    `${post.title} ${post.author_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
        `${apiUrl}/api/admin/pending-posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
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
          ? `${apiUrl}/api/admin/publish-post/${id}`
          : `${apiUrl}/api/admin/reject-post/${id}`;

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

  const openEditModal = async (postId: number) => {
    try {
      const res = await fetch(`${apiUrl}/api/admin/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch post");
      const data = await res.json();
      const post = data.post;

      const resolvedImageUrl = post.image_url || post.imageUrl || null;

      setEditingPost({
        id: post.id,
        title: post.title || "",
        santname: post.santname || "",
        category: post.category || "",
        content: post.content || "",
        image_url: resolvedImageUrl,
        youtube_url: post.youtube_url || "",
        slug: post.slug || "",
      });
      setEditForm({
        title: post.title || "",
        santname: post.santname || "",
        category: post.category || "",
        content: post.content || "",
        youtubeUrl: post.youtubeUrl || "",
      });
      setEditImageFile(null);
      setEditImagePreview(resolvedImageUrl);
      setShowEditModal(true);
    } catch (error) {
      console.log("Error fetching post for editing:", error);
      toast.error("Failed to load post for editing");
    }
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (/\s/.test(file.name)) {
        toast.error("फाइल नावात space वापरू नका", {
          description: "कृपया फाइलचे नाव बदलून पुन्हा अपलोड करा",
        });
        return;
      }
      setEditImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setEditImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeEditImage = () => {
    setEditImageFile(null);
    setEditImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEditSubmit = async () => {
    if (!editingPost || !token) return;
    if (!editForm.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setSavingEdit(true);
    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("slug", slugify(editForm.title));
      if (editForm.santname) formData.append("santname", editForm.santname);
      if (editForm.category) formData.append("category", editForm.category);
      if (editForm.content) formData.append("content", editForm.content);
      if (editForm.youtubeUrl) formData.append("youtubeUrl", editForm.youtubeUrl);
      if (editImageFile) formData.append("img", editImageFile);

      const res = await fetch(
        `${apiUrl}/api/admin/edit-post/${editingPost.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to update post");

      toast.success("Post updated successfully", {
        description: "Changes saved successfully.",
      });
      setShowEditModal(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      toast.error("Failed to update post", {
        description: "Could not save changes.",
      });
    } finally {
      setSavingEdit(false);
    }
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
      setCurrentPage(1);
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
                        onClick={() => openEditModal(p.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
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

      {/* Edit Post Modal */}
      {showEditModal && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Post</h3>

            <div className="space-y-4">
              {/* Sant Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sant Name
                </label>
                <select
                  name="santname"
                  value={editForm.santname}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select Sant</option>
                  {sants.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  value={editForm.content}
                  onChange={handleEditChange}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* YouTube URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube URL
                </label>
                <input
                  type="url"
                  name="youtubeUrl"
                  value={editForm.youtubeUrl}
                  onChange={handleEditChange}
                  placeholder="https://www.youtube.com/watch?v=XXXX"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                {editImagePreview ? (
                  <div className="mb-2 relative inline-block">
                    <div className="relative h-32 w-48 rounded-lg border overflow-hidden">
                      {editImagePreview.startsWith("data:") ? (
                        <img
                          src={editImagePreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          src={editImagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                          sizes="192px"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={removeEditImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="mb-2 h-32 w-48 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
                    No image uploaded
                  </div>
                )}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">JPG / PNG supported</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingPost(null);
                }}
                disabled={savingEdit}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={savingEdit || !editForm.title.trim()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {savingEdit ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
