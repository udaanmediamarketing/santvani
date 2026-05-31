'use client';

import {
  Mail,
  Facebook,
  Instagram,
  MessageCircle,
  Twitter,
  Linkedin,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Post } from '../types/post';
// import CategoryList from './category-list';
import CategorySidebar from './category-sidebar';
import LabelSidebar from './labels-sidebar';

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
  const router = useRouter();

  function handleCategorySelect(category: string): void {
    router.push(`/category/${encodeURIComponent(category)}`);
  }

  return (
    <div className="w-full flex flex-col gap-6 pl-3">
      {/* SOCIAL SECTION */}
      <section className="text-center mb-10">
        <h2 className="text-2xl font-bold text-orange-600 mb-6">
          आम्हाला सोशल मीडियावर फॉलो करा
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">

          {/* Facebook */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center shadow-md hover:scale-105 transition-all duration-300"
          >
            <div className="w-1/3 bg-[#1877F2] border-r border-white flex justify-center items-center py-3">
              <Facebook className="text-white text-xl" />
            </div>

            <div className="w-2/3 bg-[#1877F2] text-white py-3 text-left pl-4 font-medium">
              Facebook
            </div>
          </a>

          {/* Twitter / X */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center shadow-md hover:scale-105 transition-all duration-300"
          >
            <div className="w-1/3 bg-gray-800 border-r border-white flex justify-center items-center py-3">
              <Twitter className="text-white text-xl" />
            </div>

            <div className="w-2/3 bg-gray-800 text-white py-3 text-left pl-4 font-medium">
              X-Twitter
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/911234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center shadow-md hover:scale-105 transition-all duration-300"
          >
            <div className="w-1/3 bg-[#25D366] border-r border-white flex justify-center items-center py-3">
              <MessageCircle className="text-white text-xl" />
            </div>

            <div className="w-2/3 bg-[#1ebe5d] text-white py-3 text-left pl-4 font-medium">
              WhatsApp
            </div>
          </a>

          
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center shadow-md hover:scale-105 transition-all duration-300"
          >
            <div className="w-1/3 bg-[#0A66C2] border-r border-white flex justify-center items-center py-3">
              <Linkedin className="text-white text-xl" />
            </div>

            <div className="w-2/3 bg-[#0A66C2] text-white py-3 text-left pl-4 font-medium">
              LinkedIn
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center shadow-md hover:scale-105 transition-all duration-300"
          >
            <div className="w-1/3 bg-[#E1306C] border-r border-white flex justify-center items-center py-3">
              <Instagram className="text-white text-xl" />
            </div>

            <div className="w-2/3 bg-[#E1306C] text-white py-3 text-left pl-4 font-medium">
              Instagram
            </div>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center shadow-md hover:scale-105 transition-all duration-300"
          >
            <div className="w-1/3 bg-[#FF0000] border-r border-white flex justify-center items-center py-3">
              <Youtube className="text-white text-xl" />
            </div>

            <div className="w-2/3 bg-[#FF0000] text-white py-3 text-left pl-4 font-medium">
              YouTube
            </div>
          </a>


          {/* Reddit */}
          {/* <a href="https://www.reddit.com" target="_blank"
            className="flex items-center">
            <div className="w-1/3 bg-orange-600 flex justify-center items-center py-3">
              <Reddit className="text-white" />
            </div>
            <div className="w-2/3 bg-orange-500 text-white py-3 text-left pl-4 font-medium">
              Reddit
            </div>
          </a> */}

          {/* Pinterest */}
          {/* <a href="https://www.pinterest.com" target="_blank"
            className="flex items-center">
            <div className="w-1/3 bg-red-700 flex justify-center items-center py-3">
              <Pinterest className="text-white" />
            </div>
            <div className="w-2/3 bg-red-600 text-white py-3 text-left pl-4 font-medium">
              Pinterest
            </div>
          </a> */}

          {/* LinkedIn */}

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
                {/* <div className="relative w-28 h-20 shrink-0 overflow-hidden aspect-video bg-neutral-200">
                  {post.image_url && (
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-contain"
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
                </div> */}
                <div className="relative w-28 h-20 shrink-0 overflow-hidden bg-neutral-200 self-stretch group-hover:scale-105 transition-transform">
  {post.image_url && (
    <Image
      src={post.image_url}
      alt={post.title}
      fill
      sizes="112px"
      className="object-cover w-full h-full group-hover:scale-105 transition-transform"
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

      <div className="w-80 bg-neutral-200"> 
        <LabelSidebar onSelectCategory={handleCategorySelect} />
      </div>

    {/* Category List */}
              <div className="w-80 bg-neutral-200"> 
  <CategorySidebar onSelectCategory={handleCategorySelect} />
</div>
            </div>

  );
}
