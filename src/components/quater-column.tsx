'use client';

import {
  Mail,
  Facebook,
  Instagram,
  MessageCircle,
  Twitter,
  Linkedin,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Post } from '../types/post';

function getYoutubeEmbedUrl(url?: string) {
  const match = url?.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function QuarterColumn({
  posts = [],
}: {
  posts: Post[];
}) {

  return (
    <div className="w-full md:w-1/4 flex flex-col gap-6 pl-3">
      {/* SOCIAL SECTION */}
      <section className="text-center mb-10">
        <h2 className="text-2xl font-bold text-orange-600 mb-6">
          आम्हाला सोशल मीडियावर फॉलो करा
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          <a href="https://www.facebook.com" target="_blank"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white">
            <Facebook size={18} /> Facebook
          </a>

          <a href="https://www.instagram.com" target="_blank"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-pink-500 text-white">
            <Instagram size={18} /> Instagram
          </a>

          <a href="https://wa.me/911234567890" target="_blank"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-green-500 text-white">
            <MessageCircle size={18} /> WhatsApp
          </a>

          <a href="https://twitter.com" target="_blank"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-sky-500 text-white">
            <Twitter size={18} /> Twitter
          </a>

          <a href="https://www.linkedin.com" target="_blank"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-blue-800 text-white">
            <Linkedin size={18} /> LinkedIn
          </a>

          <a href="mailto:vishwsantsahitya@gmail.com"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gray-700 text-white">
            <Mail size={18} /> Email
          </a>
        </div>
      </section>

      {/* POSTS LIST */}
      <section className="flex flex-col gap-4">

          {posts.slice(0, 6).map((post) => {
            const embedUrl = getYoutubeEmbedUrl(post.youtube_url);

            return (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
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
                      {new Date(post.created_at || '').toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
      </section>
    </div>
  );
}
