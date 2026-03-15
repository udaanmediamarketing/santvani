// "use client";

// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import ArticleCard from "../../components/articles/article-card";

// interface SantDashboardProps {
//   activeMenu: string;
//   setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
// }

// type Article = {
//   id: number;
//   title: string;
//   created_at: string;
// };

// export default function SantDashboard({ activeMenu }: SantDashboardProps) {
//   const router = useRouter();
//   const { name } = router.query;

// const santName =
//   typeof name === "string" ? decodeURIComponent(name) : "";

//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!name) return;
//     fetch(`http://localhost:5000/api/posts/list-posts-by-sant/${encodeURIComponent(santName)}`)
//       .then((res) => res.json())
//       .then((data) => setArticles(data.posts))
//       .finally(() => setLoading(false));
//   }, [name]);

//   if (loading) {
//     return <p className="text-center mt-10">लेख लोड होत आहेत...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-[#def1de] p-6">
//       {/* Header */}
//       <h1 className="text-4xl text-center font-serif text-[#f97316] mb-10">
//         संत {name}
//       </h1>

//       {/* Articles Grid */}
//       {articles.length === 0 ? (
//         <p className="text-center text-gray-600">
//           या संताचे लेख उपलब्ध नाहीत
//         </p>
//       ) : (
//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
//           {articles.map((article) => (
//             <ArticleCard key={article.id} {...article} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }