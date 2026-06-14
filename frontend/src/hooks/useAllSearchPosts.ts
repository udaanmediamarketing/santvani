import { useEffect, useState } from 'react';
import { useAuthFetch } from '../context/authFetch';
import { Post } from '../types/post';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Hook to fetch all posts across all categories for search functionality
 * Combines posts from dashboard, kirtan, editor updates, and moving news
 */
export function useAllSearchPosts() {
  const authFetch = useAuthFetch();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const res = await authFetch(`${apiUrl}/api/dashboard/home`);
        const data = await res.json();

        // Combine all post arrays
        const allPosts = [
          ...data.posts ?? [],
          ...data.kirtanPosts ?? [],
          ...data.editorPosts ?? [],
          ...data.movingNews ?? [],
        ];

        // Remove duplicates by id
        const uniquePosts = allPosts.reduce((unique: Post[], post) => {
          if (!unique.find(p => p.id === post.id)) {
            unique.push(post);
          }
          return unique;
        }, []);

        setPosts(uniquePosts);
      } catch (err) {
        console.error('Failed to fetch all posts for search', err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPosts();
  }, [authFetch]);

  return { posts, loading };
}
