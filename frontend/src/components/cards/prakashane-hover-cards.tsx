'use client';

import { Post } from '../../types/post';
import { NewSantCard } from './new-santcard';
import { slugify, formatDate } from '../../lib/helper';

export default function PrakashaneHoverCards({
  posts = [],
}: {
  posts: Post[];
}) {

  if (posts.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-1 py-2">
      <div className="flex gap-3 overflow-x-auto">

        {posts.slice(0, 4).map((post, index) => (
          <div key={post.id || index} className="flex-shrink-0 w-[220px]">

            <NewSantCard
              href={`/${slugify(post.title)}`}
              imageSrc={post.image_url}
              youtubeUrl={post.youtube_url}
              title={post.title}
              content={post.content}
              category={post.category}
              date={formatDate(post.created_at ?? "")}
              className="h-[200px]"
            />

          </div>
        ))}

      </div>
    </div>
  );
}