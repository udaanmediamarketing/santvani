// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// interface Post {
//   id: string;
//   title: string;
// }

// export default function CategoryPosts() {
//   const params = useParams();

//   const category =
//     typeof params?.slug === "string"
//       ? decodeURIComponent(params.slug)
//       : null;

//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loadingPosts, setLoadingPosts] = useState(false);

//   useEffect(() => {
//     if (!category) return;

//     setLoadingPosts(true);

//     fetch(
//       `${apiUrl}/api/posts/list-by-category/${encodeURIComponent(
//         category
//       )}`
//     )
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch posts");
//         return res.json();
//       })
//       .then((data) => {
//         setPosts(data.posts || []);
//       })
//       .catch((err) => {
//         console.error(err);
//         setPosts([]);
//       })
//       .finally(() => {
//         setLoadingPosts(false);
//       });
//   }, [category]);

//   if (!category) {
//     return (
//       <p className="text-center text-gray-500 py-10">
//         अवैध श्रेणी (Invalid Category)
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-2xl font-bold text-orange-600 mb-6">
//         {category} मधील लेख
//       </h2>

//       {loadingPosts ? (
//         <p className="text-gray-500">लोड होत आहे...</p>
//       ) : posts.length === 0 ? (
//         <p className="text-gray-500">या श्रेणीत लेख नाहीत</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {posts.map((post) => (
//             <div
//               key={post.id}
//               className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
//             >
//               <h3 className="font-semibold text-orange-700">
//                 {post.title}
//               </h3>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
