"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";

interface Article {
  id: string;
  title: string;
  category: string;
  status: "pending" | "approved" | "cancelled";
  createdAt: string;
}

export default function ArticlesTable() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p className="text-center py-8">Loading articles...</p>;

  if (articles.length === 0)
    return <p className="text-center py-8 text-gray-500">No articles found</p>;

  return (
  <div className="mx-6">
    <Card className="p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4 text-orange-400">My Articles</h2>

      <div className="overflow-x-auto rounded-md border bg-orange-50">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="divide-x divide-gray-400">
              <TableHead className="px-4 py-2">Title</TableHead>
              <TableHead className="px-4 py-2">Sant Name</TableHead>
              <TableHead className="px-4 py-2">Status</TableHead>
              <TableHead className="px-4 py-2">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id} className="divide-x divide-gray-400">
                <TableCell className="px-4 py-2">{article.title}</TableCell>
                <TableCell className="px-4 py-2">{article.category}</TableCell>
                <TableCell className="px-4 py-2 text-center">
                  <Badge
                    variant={
                      article.status === "approved"
                        ? "default"
                        : article.status === "cancelled"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-2 text-center">
                  {new Date(article.createdAt).toLocaleDateString("en-IN")}
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