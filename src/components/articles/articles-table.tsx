"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
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
  if (articles.length === 0)
    return <p className="text-center py-8 text-gray-500">No articles found</p>;

  return (
  <div className="mx-6">
    <Card className="p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4 text-orange-400">माझे लेख</h2>

      <div className="overflow-x-auto rounded-md border bg-orange-50">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="divide-x divide-gray-400 text-md">
              <TableHead className="px-4 py-2 font-bold">शीर्षक</TableHead>
<TableHead className="px-4 py-2 font-bold">संताचे नाव</TableHead>
<TableHead className="px-4 py-2 font-bold">स्थिती</TableHead>
<TableHead className="px-4 py-2 font-bold">निर्मिती दिनांक</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles?.map((article) => (
              <TableRow key={article.id} className="divide-x divide-gray-400">
                <TableCell className="px-4 py-2">{article.title}</TableCell>
                <TableCell className="px-4 py-2">{article.category}</TableCell>
                <TableCell className="px-4 py-2">
                 {/* <Badge
  variant={
    article.status === "rejected"
      ? "default"
      : article.status === "published"
      ? "destructive"
      : "secondary"
  }
  className="capitalize"
> */}
  <span>{statusMap[article.status] ?? article.status}</span>
{/* </Badge> */}
</TableCell>
                <TableCell className="px-4 py-2 ">
                  {new Date(article.created_at).toLocaleDateString("mr-IN")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  </div>
);
}