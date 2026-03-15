'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { cn } from '../lib/utils';
import { Post } from '../types/post';
interface WorldFreshUpdateCardProps {
  post: Post;
  className?: string;
}

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function WorldFreshUpdateCard({
  post,
  className,
}: WorldFreshUpdateCardProps) {
  const embedUrl = post.youtube_url
    ? getYoutubeEmbedUrl(post.youtube_url)
    : null;

  return (
    <div className={cn('relative w-full', className)}>
      {/* Media */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
        {post.image_url && (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        )}

        {!post.image_url && embedUrl && (
          <iframe
            src={embedUrl}
            title={post.title}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        )}

        {!post.image_url && !embedUrl && (
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-rose-400" />
        )}

      </div>

      {/* Content */}
      <div className="pt-2 space-y-1 text-left">
  {/* Category */}
  <span className="inline-block bg-orange-600 text-white text-xs font-semibold px-2 py-0.5">
    {post?.category}
  </span>

  {/* Title */}
  <h3 className="text-sm font-semibold leading-snug line-clamp-3">
    {post.title}
  </h3>

  {/* Date */}
  <div className="flex items-center gap-1 text-xs text-neutral-600">
    <Calendar size={12} />
    <span>
      {new Date(post.created_at ?? "").toLocaleDateString()}
    </span>
  </div>
</div>

      {/* Click overlay */}
      <Link
        href={`/${post.slug}`}
        className="absolute inset-0"
        aria-label={post.title}
      />
    </div>
  );
}