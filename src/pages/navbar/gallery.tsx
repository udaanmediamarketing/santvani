// import { GetServerSideProps } from "next";
// import Image from "next/image";

// interface GalleryPost {
//   id: string;
//   title: string;
//   image_url?: string;
//   youtube_url?: string;
// }

// function getYoutubeEmbedUrl(url: string) {
//   const match = url.match(
//     /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
//   );
//   return match ? `https://www.youtube.com/embed/${match[1]}` : null;
// }

// export default function GalleryPage({ posts }: { posts: GalleryPost[] }) {
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold text-orange-600 mb-8">
//         गॅलरी
//       </h1>

//       {posts.length === 0 ? (
//         <p className="text-gray-500">गॅलरीमध्ये काही उपलब्ध नाही</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post) => {
//             const embedUrl = post.youtube_url
//               ? getYoutubeEmbedUrl(post.youtube_url)
//               : null;

//             return (
//               <div
//                 key={post.id}
//                 className="bg-white rounded-lg shadow overflow-hidden"
//               >
//                 {post.image_url ? (
//                   <div className="relative aspect-video">
//                     <Image
//                       src={post.image_url}
//                       alt={post.title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 ) : embedUrl ? (
//                   <iframe
//                     src={embedUrl}
//                     className="w-full aspect-video"
//                     allowFullScreen
//                   />
//                 ) : null}

//                 <div className="p-4">
//                   <h3 className="font-semibold text-orange-700">
//                     {post.title}
//                   </h3>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await fetch("http://localhost:5000/api/posts/gallery");

//   if (!res.ok) {
//     return { props: { posts: [] } };
//   }

//   const data = await res.json();

//   return {
//     props: {
//       posts: data.posts || [],
//     },
//   };
// };



import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";

interface GalleryPost {
  id: string;
  title: string;
  category?: string;
  image_url?: string;
  youtube_url?: string;
}

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function GalleryPage({ posts }: { posts: GalleryPost[] }) {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) =>
    `${post.title} ${post.category ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        गॅलरी
      </h1>

      {/* SEARCH BAR */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="शीर्षक किंवा कॅटेगरी शोधा..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-gray-500">गॅलरीमध्ये काही उपलब्ध नाही</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            const embedUrl = post.youtube_url
              ? getYoutubeEmbedUrl(post.youtube_url)
              : null;

            return (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {post.image_url ? (
                  <div className="relative aspect-video">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : embedUrl ? (
                  <iframe
                    src={embedUrl}
                    className="w-full aspect-video"
                    allowFullScreen
                  />
                ) : null}

                <div className="p-4">
                  <h3 className="font-semibold text-orange-700">
                    {post.title}
                  </h3>

                  {post.category && (
                    <p className="text-sm text-gray-500 mt-1">
                      {post.category}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:5000/api/posts/gallery");

  if (!res.ok) {
    return { props: { posts: [] } };
  }

  const data = await res.json();

  return {
    props: {
      posts: data.posts || [],
    },
  };
};
