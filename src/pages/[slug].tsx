import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Navbar from '../components/navbar';

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
  if (!post) {
    return (
      <>
      <Navbar/>
    <div className="text-center py-20">Post not found</div>
    </>);
  }

  const embedUrl = post.youtube_url
    ? getYoutubeEmbedUrl(post.youtube_url)
    : null;

  return (
    <>
    <Navbar/>
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold">
        {post.title}
      </h1>

      <div className="flex gap-3 text-sm text-gray-600">
        {post.category && (
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            {post.category}
          </span>
        )}
        {post.created_at && (
          <span>
            {new Date(post.created_at).toLocaleDateString('mr-IN')}
          </span>
        )}
      </div>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            No media available
          </div>
        )}
      </div>

      {post.content && (
        <div className="prose max-w-none text-lg">
          {post.content}
        </div>
      )}
    </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  const res = await fetch(
    `http://localhost:5000/api/posts/get-by-slug/${encodeURIComponent(slug)}`
  );

  if (!res.ok) {
    return { props: { post: null } };
  }

  const post = await res.json();

  return {
    props: { post },
  };
};