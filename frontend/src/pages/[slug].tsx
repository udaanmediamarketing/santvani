import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import QuarterColumn from "../components/quater-column";
import Navbar from "../components/navbar";
import { useAllSearchPosts } from "../hooks/useAllSearchPosts";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Post {
  title: string;
  content?: string;
  image_url?: string;
  youtube_url?: string;
  category?: string;
  created_at?: string;
}

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function PostPage({ post }: { post: Post | null }) {
  const { posts } = useAllSearchPosts();

  if (!post) {
    return (
      <>
        <Navbar posts={posts} />
        <div className="text-center py-20">Post not found</div>
      </>);
  }

  const embedUrl = post.youtube_url
    ? getYoutubeEmbedUrl(post.youtube_url)
    : null;

  return (
    <>
      <Navbar posts={posts} />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">

  {/* LEFT : POST CONTENT */}
  <div className="w-full lg:w-3/4 px-4 sm:px-6 lg:px-10 py-10">
    <div className="max-w-screen-xl">

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>

      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">
        {post.category && (
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
            {post.category}
          </span>
        )}
        {post.created_at && (
          <span>
            {new Date(post.created_at).toLocaleDateString("mr-IN")}
          </span>
        )}
      </div>

      <div className="w-full flex justify-center mb-8">
        <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">

          {post.image_url ? (
            <Image
              src={post.image_url}
              alt={post.title}
              width={1200}
              height={800}
              className="w-full h-auto object-contain max-h-[80vh]"
            />
          ) : embedUrl ? (
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-200">
              No media available
            </div>
          )}

        </div>
      </div>

      {post.content && (
        <div className="prose prose-lg max-w-none text-gray-800">
          {post.content}
        </div>
      )}

    </div>
  </div>

  {/* RIGHT : SIDEBAR */}
  <div className="w-full md:w-[30%] px-4 py-10 ">
    <QuarterColumn posts={[]} />
  </div>

      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    `${apiUrl}/api/posts/get-by-slug/${encodeURIComponent(slug)}`
  );

  if (!res.ok) {
    return { props: { post: null } };
  }

  const post = await res.json();

  return {
    props: { post },
  };
};
