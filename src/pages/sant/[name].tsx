"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SantNavbar from "../../components/sant-navbar";
import ArticleCard from "../../components/articles/article-card";
import { useAuthFetch } from "../context/authFetch";

type Article = {
  id: number;
  title: string;
  content: string;
  santname: string;
  created_at: string;
  image_url?: string;
};

export default function SantPage() {
  const router = useRouter();
  const { name } = router.query;

  const [activeMenu, setActiveMenu] = useState("home");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const authFetch = useAuthFetch();

  useEffect(() => {
    if (!name) return;
    const santName =
  typeof name === "string" ? decodeURIComponent(name) : "";
    authFetch(`http://localhost:5000/api/posts/list-posts-by-sant/${encodeURIComponent(santName)}`)
      .then((res) => res.json())
      .then((data) => setArticles(data.posts))
      .finally(() => setLoading(false));
  }, [name]);

  return (
    <>
      <SantNavbar onMenuClick={setActiveMenu} activeMenu={activeMenu} />

      <div className="p-6 bg-[#def1de] min-h-screen">
        <h1 className="text-center text-4xl font-bold text-[#f97316] font-serif mb-10">
          संत {name}
        </h1>

        {loading && <p className="text-center">लोड होत आहे...</p>}
        {/* Articles as Sant Cards */}
        {articles.length === 0 ? (
        <p className="text-center text-gray-600">
          या संताचे लेख उपलब्ध नाहीत
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              content={article.content}
              created_at={article.created_at}
              image_url={article.image_url}
            />
          ))}
        </div>
      )}
      </div>
    </>
  );
}