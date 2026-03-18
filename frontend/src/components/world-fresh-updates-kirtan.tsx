'use client';

import WorldFreshUpdateCard from './world-fresh-updates';
import Link from 'next/link';
import { Post } from '../types/post';

export default function WorldFreshUpdatesKirtan({ title, posts }: { title: string, posts?: Post[] }) {
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
