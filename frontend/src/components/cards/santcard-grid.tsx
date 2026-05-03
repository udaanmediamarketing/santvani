'use client';

import { useEffect, useState } from 'react';
import { NewSantCard } from './new-santcard';
import { slugify, formatDate} from '../../lib/helper';
import { useAuthFetch } from '../../context/authFetch';
import { Post } from '../../types/post';

export default function NewSantGrid({
  posts = [],
}: {
  posts: Post[];
}) {
  // const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const authFetch = useAuthFetch();

  if (posts.length < 5) return null;

  return (
  <div className="max-w-5xl mx-auto px-2 py-2 mt-10 border-2 border-gray-200">
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-[1fr_2fr_1fr]
        lg:grid-rows-2
        gap-2
      "
    >
      {/* Left column – row 1 */}
      <NewSantCard
        href={`/${slugify(posts[0].title)}`}
        imageSrc={posts[0]?.image_url}
        youtubeUrl={posts[0]?.youtube_url}
        title={posts[0]?.title}
        content={posts[0]?.content}
        category={posts[0]?.category}
        date={formatDate(posts[0]?.created_at ?? '')}
        className="lg:col-start-1 lg:row-start-1 h-[200px]"
      />

      {/* Center column – spans 2 rows */}
      <NewSantCard
      href={`/${slugify(posts[2].title)}`}
        imageSrc={posts[2]?.image_url}
        youtubeUrl={posts[2]?.youtube_url}
        title={posts[2]?.title}
        content={posts[2]?.content}
        category={posts[2]?.category}
        date={formatDate(posts[2]?.created_at ?? '')}
        // className="lg:row-span-2"
        className="lg:col-start-2 lg:row-start-1 lg:row-span-2 mt-1 h-[400px]"
      />

      {/* Right column – row 1 */}
      <NewSantCard
      href={`/${slugify(posts[3].title)}`}
        imageSrc={posts[3]?.image_url}
        youtubeUrl={posts[3]?.youtube_url}
        title={posts[3]?.title}
        content={posts[3]?.content}
        category={posts[3]?.category}
        date={formatDate(posts[3]?.created_at ?? "")}
        className="lg:col-start-3 lg:row-start-1 h-[200px]"
      />

      {/* Left column – row 2 */}
      <NewSantCard
      href={`/${slugify(posts[1].title)}`}
        imageSrc={posts[1]?.image_url}
        youtubeUrl={posts[1]?.youtube_url}
        title={posts[1]?.title}
        content={posts[1]?.content}
        category={posts[1]?.category}
        date={formatDate(posts[1]?.created_at ?? "")}
        className="lg:col-start-1 lg:row-start-2 h-[200px]"
      />

      {/* Right column – row 2 */}
      <NewSantCard
      href={`/${slugify(posts[4].title)}`}
        imageSrc={posts[4]?.image_url}
        youtubeUrl={posts[4]?.youtube_url}
        title={posts[4]?.title}
        content={posts[4]?.content}
        category={posts[4]?.category}
        date={formatDate(posts[4]?.created_at ?? "")}
        className="lg:col-start-3 lg:row-start-2 h-[200px]"
      />
    </div>
  </div>
);
}