"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "../components/ui/badge";
 import { useMemo } from "react";
 import { Post } from '../types/post';
interface NewsItem {
  category: string;
  title: string;
  subtitle: string;
  extra: string;
}

export default function VerticalMovingNewsList({
  posts = [],
}: {
  posts: Post[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [translateY, setTranslateY] = useState(0);

  const itemHeight = 120;
  const speed = 150; // px/sec

  /* ===========================
     MAP POSTS → NEWS ITEMS
  ============================ */

const items = useMemo<NewsItem[]>(() => {
  if (!posts.length) return [];

  return posts.map((post) => ({
    category: post.category || "समाचार",
    title: post.title,
    subtitle: post.content ?? '',
    extra: "",
  }));
}, [posts]);

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

  if (!items.length) return null;

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
          {items.map((item, index) => (
            <NewsRow key={`first-${index}`} item={item} />
          ))}
          {items.map((item, index) => (
            <NewsRow key={`second-${index}`} item={item} />
          ))}
        </div>

        {/* Fade overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 h-12 w-full bg-gradient-to-b from-white/90 to-transparent" />
          <div className="absolute bottom-0 h-12 w-full bg-gradient-to-t from-white/90 to-transparent" />
        </div>
      </div>
    </div>
  );
}

/* ===========================
   ROW
=========================== */
function NewsRow({ item }: { item: NewsItem }) {
  return (
    <div className="flex items-start gap-4 px-8 py-4 border-b min-h-[120px]">
      <Badge className="bg-orange-100 text-orange-800 font-bold px-4 py-2 min-w-[130px]">
        {item.category}
      </Badge>

      <div className="flex-1">
        <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
        <p className="text-gray-700 line-clamp-2">{item.subtitle}</p>
      </div>
    </div>
  );
}