'use client';

import { useEffect, useState } from 'react';
import ReadMorePostCard, { Post } from '../components/read-more-card';
import Navbar from '../components/navbar';

const POSTS_PER_PAGE = 4;

export default function ReadMoreSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          'http://localhost:5000/api/posts/list-all-posts'
        );
        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        console.error('Failed to fetch posts', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  return (
    <>
      <Navbar />
      <section className="w-full border border-neutral-400 p-4 mr-4">
        {loading ? (
          <p className="text-sm text-neutral-500">Loading...</p>
        ) : (
          <>
            {/* POSTS */}
            <div>
              {currentPosts.map((post) => (
                <ReadMorePostCard key={post.id} post={post} />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-2">
                {/* Previous */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border rounded disabled:opacity-40"
                >
                  ‹
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;

                  // show first, last, current ±1
                  if (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 border rounded ${
                          page === currentPage
                            ? 'bg-black text-white'
                            : 'bg-white'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }

                  // dots
                  if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2 text-gray-500">
                        …
                      </span>
                    );
                  }

                  return null;
                })}

                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(p + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border rounded disabled:opacity-40"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}