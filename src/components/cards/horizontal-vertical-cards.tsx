'use client';

import { useEffect, useState } from 'react';
import DynamicCard from '../../components/cards/card';
import { formatDate, slugify } from '../../lib/helper';
import { Skeleton } from '../../components/ui/skeleton';
import { cn } from '../../lib/utils';
import { useAuthFetch } from '../../context/authFetch';

interface Post {
  id?: string;
  title: string;
  content: string;
  image_url?: string;
  youtube_url?: string;
  category?: string;
  created_at: string;
}

export default function SantHorizontalGrid({
  cardLayout = 'row',
  variant = 'main',
}: {
  cardLayout?: 'row' | 'column';
  variant?: 'main' | 'side';
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const authFetch = useAuthFetch();

  useEffect(() => {
    authFetch('http://localhost:5000/api/posts/list-all-posts')
      .then(res => res.json())
      .then(data => {
        const postsArray = Array.isArray(data)
          ? data
          : Array.isArray(data.posts)
          ? data.posts
          : [];
        setPosts(postsArray.slice(0, 4));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-4 place-items-center">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-50 w-3/4" />
          ))}
        </div>
      </div>
    );
  }

  if (!posts.length) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div
        className={cn("grid gap-4", {
          // Vertical list
          "grid-cols-[minmax(0,1fr)]": cardLayout === 'row',
          // Horizontal grid
          "grid-cols-2 lg:grid-cols-4 items-stretch": cardLayout === 'column',
        })}
      >
        {posts.map((post, index) => (
          <DynamicCard
            key={post.id || index}
            href={`/${slugify(post.title)}`}
            imageSrc={post.image_url}
            youtubeUrl={post.youtube_url}
            title={post.title}
            category={post.category || 'Sant Vani'}
            date={formatDate(post.created_at)}
            layout={cardLayout}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}