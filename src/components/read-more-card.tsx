'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Post } from '../types/post';

function getYoutubeEmbedUrl(url?: string) {
  if (!url) return null;

  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );

  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

interface Props {
  post: Post;
}

export default function ReadMorePostCard({ post }: Props) {
  const embedUrl = getYoutubeEmbedUrl(post.youtube_url);

  return (
    <Link
      href={`/${post.slug}`}
      className="flex gap-4 py-5 border-b border-neutral-200"
    >
      {/* LEFT MEDIA */}
      <div className="relative w-48 h-38 shrink-0 bg-neutral-100 overflow-hidden">
        {post.image_url && (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
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
          <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500">
            No media
          </div>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex flex-col items-start gap-2 flex-1">
  {/* Title (top, left-aligned) */}
  <h3 className="text-lg font-bold leading-snug line-clamp-2 text-left">
    {post.title}
  </h3>

  {/* Category (just below title) */}
  <span className="bg-orange-600 text-white text-xs font-semibold px-2 py-0.5 w-fit">
    {post.category}
  </span>

  {/* Meta */}
  <div className="flex items-center gap-3 text-sm text-neutral-600">
    <span>By - Tukadyadas</span>
    <div className="flex items-center gap-1">
      <Calendar size={14} />
      <span>
        {new Date(post.created_at || '').toLocaleDateString()}
      </span>
    </div>
  </div>

        {/* Excerpt */}
        {/* {post.excerpt && (
          <p className="text-sm text-neutral-700 line-clamp-2">
            {post.excerpt}
          </p>
        )} */}
      </div>

      {/* RIGHT COUNT */}
      <div className="flex items-center">
        <span className="bg-orange-700 text-white text-sm font-semibold px-2 py-1">
          0
        </span>
      </div>
    </Link>
  );
}