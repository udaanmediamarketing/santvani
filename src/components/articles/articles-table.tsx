// "use client";

// import { useEffect, useState } from "react";
// import { Card } from "../ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
// import { Badge } from "../ui/badge";

// interface Article {
//   id: string;
//   title: string;
//   category: string;
//   status: "pending" | "approved" | "cancelled";
//   createdAt: string;
// }

// export default function ArticlesTable() {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const res = await fetch("/api/articles");
//         const data = await res.json();
//         setArticles(data);
//       } catch (error) {
//         console.error("Error fetching articles:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   if (loading) return <p className="text-center py-8">Loading articles...</p>;

//   if (articles.length === 0)
//     return <p className="text-center py-8 text-gray-500">No articles found</p>;

//   return (
//   <div className="mx-6">
//     <Card className="p-4 mt-4">
//       <h2 className="text-lg font-semibold mb-4 text-orange-400">My Articles</h2>

//       <div className="overflow-x-auto rounded-md border bg-orange-50">
//         <Table className="min-w-full border-collapse">
//           <TableHeader>
//             <TableRow className="divide-x divide-gray-400">
//               <TableHead className="px-4 py-2">Title</TableHead>
//               <TableHead className="px-4 py-2">Sant Name</TableHead>
//               <TableHead className="px-4 py-2">Status</TableHead>
//               <TableHead className="px-4 py-2">Created At</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {articles.map((article) => (
//               <TableRow key={article.id} className="divide-x divide-gray-400">
//                 <TableCell className="px-4 py-2">{article.title}</TableCell>
//                 <TableCell className="px-4 py-2">{article.category}</TableCell>
//                 <TableCell className="px-4 py-2 text-center">
//                   <Badge
//                     variant={
//                       article.status === "approved"
//                         ? "default"
//                         : article.status === "cancelled"
//                         ? "destructive"
//                         : "secondary"
//                     }
//                   >
//                     {article.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="px-4 py-2 text-center">
//                   {new Date(article.createdAt).toLocaleDateString("en-IN")}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </Card>
//   </div>
// );
// }
"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useAuth } from "../../pages/context/AuthContext";

interface Article {
  id: string;
  title: string;
  category: string;
  status: "pending" | "published" | "rejected";
  created_at: string;
}
const statusMap: Record<string, string> = {
  published: "प्रकाशित",
  rejected: "नाकारले",
  pending: "प्रलंबित",
};
export default function ArticlesTable() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const id = user?.id;

  useEffect(() => {
  const fetchArticles = async () => {
    const res = await fetch(`http://localhost:5000/api/posts/list-posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    const data = await res.json();
    const articlesArray = Array.isArray(data)
        ? data
        : Array.isArray(data.posts)
        ? data.posts
        : [];
    setArticles(articlesArray || []);
    setLoading(false);
  };

  fetchArticles();
}, []);

  if (loading) return <p className="text-center py-8">Loading articles...</p>;
  console.log("Articles:", articles[0].status);
  if (articles.length === 0)
    return <p className="text-center py-8 text-gray-500">No articles found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-10">
      {/* 🔶 Page Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-orange-500 font-serif">
          माझे लेख
        </h2>
        <p className="text-sm text-gray-600">
          आपण सबमिट केलेले संत साहित्य लेख
        </p>
      </div>

      {/* 🔶 Card Wrapper */}
      <Card
        className="
          bg-white/90 backdrop-blur
          border border-orange-200
          shadow-xl shadow-orange-200/40
          rounded-2xl
          p-6
          animate-fade-in
        "
      >
        {/* Loading */}
        {loading && (
          <p className="text-center py-10 text-gray-500">
            लेख लोड होत आहेत...
          </p>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            सध्या कोणतेही लेख उपलब्ध नाहीत.
          </p>
        )}

        {/* Table */}
        {!loading && articles.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-orange-100">
            <Table className="min-w-full">
              <TableHeader className="bg-orange-50">
                <TableRow>
                  <TableHead className="px-4 py-3 font-semibold text-gray-700">
                    शीर्षक
                  </TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-gray-700">
                    संत
                  </TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-gray-700 text-center">
                    स्थिती
                  </TableHead>
                  <TableHead className="px-4 py-3 font-semibold text-gray-700 text-center">
                    तारीख
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {articles.map((article) => (
                  <TableRow
                    key={article.id}
                    className="
                      hover:bg-orange-50/60
                      transition-all
                    "
                  >
                    <TableCell className="px-4 py-3 font-medium">
                      {article.title}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {article.category}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-center">
                      {/* <Badge
                        className={
                          article.status == "approved"
                            ? "bg-green-100 text-green-700"
                            : article.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      > */}
                         <span>{statusMap[article.status] ?? article.status}</span>
                      {/* </Badge> */}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-center text-sm text-gray-600">
                      {new Date(article.created_at).toLocaleDateString("mr-IN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
