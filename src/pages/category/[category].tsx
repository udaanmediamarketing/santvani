import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import ReadMorePostCard from '../../components/read-more-card';
import Navbar from '../../components/navbar';
import { Post } from '../../types/post';
interface Props {
  category: string;
}

const POSTS_PER_PAGE = 6;

export default function CategoryPage({ category }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/posts/list-posts-by-category/${encodeURIComponent(category)}`
        );

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        setPosts(data.posts ?? data);
      } catch (err) {
        console.error('Failed to fetch posts', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [category]);

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
        ) : posts.length === 0 ? (
          <p className="text-sm text-neutral-500">No posts found</p>
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
              <div className="flex justify-center items-center gap-2 mt-8">
                {/* Prev */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border rounded disabled:opacity-40"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;

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
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const category = params?.category as string;

  if (!category) {
    return { notFound: true };
  }

  return {
    props: {
      category: decodeURIComponent(category),
    },
  };
};