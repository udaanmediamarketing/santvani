'use client';

import { useEffect, useState } from 'react';
import WorldFreshUpdateCard from './world-fresh-updates';
import Link from 'next/link';
import { Post } from '../types/post';

export default function WorldFreshUpdatesKirtan({ title, posts }: { title: string, posts?: Post[] }) {
  // const [posts, setPosts] = useState<Post[]>([]);
  // const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchKirtanPosts = async () => {
//       try {
//         const res = await fetch(
//   `http://localhost:5000/api/posts/list-posts-by-category/${encodeURIComponent('किर्तन')}`
// );
//         const data = await res.json();
//         setPosts(data.posts.slice(0, 4));
//       } catch (err) {
//         console.error('Failed to fetch kirtan posts', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchKirtanPosts();
//   }, []);

  // if (loading) return null;

  return (
    <section className="w-full border border-neutral-200 p-4">
  {/* Header */}
  <div className="flex items-center justify-between mb-1">
    <div className="relative">
      <span className="bg-orange-700 text-white text-sm font-semibold px-4 py-2">
        {title}
      </span>
    </div>

   <Link
  href={`/category/किर्तन`}
  className="text-sm text-black hover:underline"
>
  Show More
</Link>


  </div>

  {/* Divider */}
  <div className="h-px w-full bg-neutral-300 mb-6" />

  {/* Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {posts?.map((post) => (
      <WorldFreshUpdateCard
        key={post.id}
        post={post}
      />
    ))}
  </div>
</section>
  );
}
