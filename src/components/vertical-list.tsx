"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "../components/ui/badge";
import { useAuthFetch } from "../pages/context/authFetch";

interface NewsItem {
  category: string;
  title: string;
  subtitle: string;
  extra: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  category?: string;
}

export default function VerticalMovingNewsList() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const authFetch = useAuthFetch();
  const containerRef = useRef<HTMLDivElement>(null);

  const [translateY, setTranslateY] = useState(0);
  const itemHeight = 120;
  const speed = 150; // px/sec

  /* ===========================
     FETCH NEWS FROM API
  ============================ */
  useEffect(() => {
    authFetch("http://localhost:5000/api/posts/list-all-posts")
      .then(res => res.json())
      .then(data => {
        const posts: Post[] = Array.isArray(data)
          ? data
          : Array.isArray(data.posts)
          ? data.posts
          : [];

        const mappedItems: NewsItem[] = posts.map(post => ({
          category: post.category || "समाचार",
          title: post.title,
          subtitle: post.content,
          extra: ""
        }));

        setItems(mappedItems);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  /* ===========================
     AUTO SCROLL ANIMATION
  ============================ */
  useEffect(() => {
    if (!items.length) return;

    let lastTime = 0;
    let y = 0;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      y -= (speed * delta) / 1000;

      const totalHeight = items.length * itemHeight;
      if (Math.abs(y) >= totalHeight) y = 0;

      setTranslateY(y);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [items.length]);

  if (loading || !items.length) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg">
          <span className="font-bold text-lg uppercase tracking-wider">
            हॉटेस्ट न्यूज
          </span>
        </div>
      </div>

      {/* Moving List */}
      <div className="relative h-[300px] overflow-hidden rounded-3xl border-4 border-orange-200/70 bg-white/90 shadow-2xl">
        <div
          ref={containerRef}
          className="absolute inset-0 flex flex-col"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {/* First set */}
          {items.map((item, index) => (
            <NewsRow key={`first-${index}`} item={item} />
          ))}

          {/* Duplicate set for seamless loop */}
          {items.map((item, index) => (
            <NewsRow key={`second-${index}`} item={item} />
          ))}
        </div>

        {/* Fade overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/90 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/90 to-transparent" />
        </div>
      </div>
    </div>
  );
}

/* ===========================
   REUSABLE ROW COMPONENT
=========================== */
function NewsRow({ item }: { item: NewsItem }) {
  return (
    <div className="flex items-start gap-4 px-8 py-4 hover:bg-orange-50/50 border-b border-orange-100/50 min-h-[120px]">
      <Badge className="bg-gradient-to-br from-orange-500/20 to-rose-500/20 
                        border-orange-300/50 text-orange-900 font-bold px-4 py-2 text-sm 
                        shadow-md whitespace-nowrap min-w-[130px] mt-1">
        {item.category}
      </Badge>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1 pr-4">
          {item.title}
        </h3>
        <p className="text-base text-gray-700 line-clamp-2 pr-4">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}