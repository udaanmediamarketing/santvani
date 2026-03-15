'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReadMorePostCard from './read-more-card';
import { Post } from '../types/post';

export default function ReadMoreSection({
  posts = [],
}: {
  posts: Post[];
}) {

  return (
    <section className="w-full border border-neutral-400 p-4 mr-4">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b mb-2">
        <span className="bg-orange-700 text-white text-sm font-semibold px-4 py-1">
          READ MORE
        </span>

        <Link
          href="/all-posts"
          className="text-sm font-medium hover:underline"
        >
          Show more
        </Link>
      </div>

      {/* BODY */}
      <div>
        {posts.map((post) => (
          <ReadMorePostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
      <Link
        href="/all-posts"
        className="
          inline-flex items-center justify-center bg-orange-700
          px-6 py-2
          text-md font-semibold text-white
          transition hover:orange-500
        "
      >
        Load More
      </Link>
    </div>
    </section>
  );
}