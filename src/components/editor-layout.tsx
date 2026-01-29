'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
 import { Post } from '../types/post';

interface Props {
  featured: Post;
  list: Post[];
}
function getYoutubeEmbedUrl(url?: string) {
  const match = url?.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function EditorUpdateCardLayout({
  featured,
  list,
}: Props) {
  const featuredEmbed = getYoutubeEmbedUrl(featured.youtube_url);

  return (
    <section className="w-full border border-neutral-200 p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-neutral-300 pb-2 mb-4">
        <span className="bg-orange-700 text-white text-sm font-semibold px-4 py-2">
          EDITOR UPDATES
        </span>
        <Link
          href="/all-posts"
          className="text-sm font-medium hover:underline"
        >
          Show More
        </Link>
      </div>

      {/* BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT FEATURED */}
        <Link
          href={`/${featured.slug}`}
          className="relative col-span-2 h-[420px] overflow-hidden group"
        >
          {/* Media */}
          {featured.image_url && (
            <Image
              src={featured.image_url}
              alt={featured.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          )}

          {!featured.image_url && featuredEmbed && (
            <iframe
              src={featuredEmbed}
              title={featured.title}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-semibold px-2 py-1 z-10">
            {featured.category}
          </span>

          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
            <h2 className="text-2xl font-bold leading-tight line-clamp-2">
              {featured.title}
            </h2>

            <div className="flex items-center gap-2 text-sm opacity-90 mt-2">
              <span>By - Tukadyadas</span>
              <Calendar size={14} />
              <span>
                {new Date(featured.created_at || "").toLocaleDateString()}
              </span>
            </div>
          </div>
        </Link>

        {/* RIGHT LIST */}
        <div className="flex flex-col gap-4">
          {list.map((post) => {
            const embedUrl = getYoutubeEmbedUrl(post.youtube_url);

            return (
              <Link
                key={post.id}
                href={`/${post.slug}`}
                className="flex gap-3 group"
              >
                {/* Thumbnail */}
                <div className="relative w-28 h-20 shrink-0 overflow-hidden bg-neutral-200">
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
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1">
                  <span className="bg-orange-600 text-white text-xs font-semibold px-2 py-0.5 w-fit">
                    {post.category}
                  </span>

                  <p className="text-sm font-semibold leading-snug line-clamp-2 group-hover:underline">
                    {post.title}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-neutral-600">
                    <Calendar size={12} />
                    <span>
                      {new Date(post.created_at ?? "").toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
