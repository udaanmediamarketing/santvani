// import { GetServerSideProps } from 'next';
// import Image from 'next/image';

// interface Post {
//   title: string;
//   content?: string;
//   image_url?: string;
//   youtube_url?: string;
//   category?: string;
//   created_at?: string;
// }

// function getYoutubeEmbedUrl(url: string) {
//   const match = url.match(
//     /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
//   );
//   return match ? `https://www.youtube.com/embed/${match[1]}` : null;
// }

// export default function PostPage({ post }: { post: Post | null }) {
//   if (!post) {
//     return <div className="text-center py-20">Post not found</div>;
//   }

//   const embedUrl = post.youtube_url
//     ? getYoutubeEmbedUrl(post.youtube_url)
//     : null;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
//       <h1 className="text-3xl md:text-4xl font-bold">
//         {post.title}
//       </h1>

//       <div className="flex gap-3 text-sm text-gray-600">
//         {post.category && (
//           <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
//             {post.category}
//           </span>
//         )}
//         {post.created_at && (
//           <span>
//             {new Date(post.created_at).toLocaleDateString('mr-IN')}
//           </span>
//         )}
//       </div>

//       <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
//         {post.image_url ? (
//           <Image
//             src={post.image_url}
//             alt={post.title}
//             fill
//             className="object-cover"
//             sizes="100vw"
//           />
//         ) : embedUrl ? (
//           <iframe
//             src={embedUrl}
//             className="absolute inset-0 w-full h-full"
//             allowFullScreen
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full bg-gray-200">
//             No media available
//           </div>
//         )}
//       </div>

//       {post.content && (
//         <div className="prose max-w-none text-lg">
//           {post.content}
//         </div>
//       )}
//     </div>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const slug = params?.slug as string;

//   const res = await fetch(
//     `http://localhost:5000/api/posts/get-by-slug/${encodeURIComponent(slug)}`
//   );

//   if (!res.ok) {
//     return { props: { post: null } };
//   }

//   const post = await res.json();

//   return {
//     props: { post },
//   };
// };

import { GetServerSideProps } from "next";
import Image from "next/image";

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
    return <div className="text-center py-20">Post not found</div>;
  }

  const embedUrl = post.youtube_url
    ? getYoutubeEmbedUrl(post.youtube_url)
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">
        {post.category && (
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
            {post.category}
          </span>
        )}
        {post.created_at && (
          <span className="flex items-center">
            {new Date(post.created_at).toLocaleDateString("mr-IN")}
          </span>
        )}
      </div>

      {/* Media */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
          {post.image_url ? (
            <div className="relative w-full">
              <Image
                src={post.image_url}
                alt={post.title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain max-h-[80vh]"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          ) : embedUrl ? (
            <div className="relative w-full aspect-video">
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-200">
              No media available
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-base sm:prose-lg max-w-none text-gray-800">
            {post.content}
          </div>
        </div>
      )}
    </div>
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
