"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "../components/ui/badge";
 import { useMemo } from "react";
 import { Post } from '../types/post';
 import { useRouter } from "next/navigation";

interface NewsItem {
  category: string;
  title: string;
  subtitle: string;
  extra: string;
  slug: string;
}

export default function VerticalMovingNewsList({
  posts = [],
}: {
  posts: Post[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [translateY, setTranslateY] = useState(0);

  const itemHeight = 120;
  const speed = 100; // px/sec

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
    slug: post.slug || '',
  }));
}, [posts]);

  /* ===========================
     AUTO SCROLL ANIMATION
  ============================ */
useEffect(() => {
  if (!items.length) return;

  let lastTime = 0;
  let y = 0;
  let isPaused = false;
  let pauseStart = 0;

  const pauseDuration = 2000; // 2 seconds
  const speed = 60; // px/sec (adjust for smoothness)

  const animate = (time: number) => {
    if (!lastTime) lastTime = time;
    const delta = time - lastTime;
    lastTime = time;

    if (isPaused) {
      if (time - pauseStart >= pauseDuration) {
        isPaused = false;
      } else {
        requestAnimationFrame(animate);
        return;
      }
    }

    y -= (speed * delta) / 1000;

    const totalHeight = items.length * itemHeight;

    // loop reset
    if (Math.abs(y) >= totalHeight) {
      y = 0;
    }

    // 🎯 check if we reached a full row
    const remainder = Math.abs(y) % itemHeight;

    if (remainder < 1) {
      isPaused = true;
      pauseStart = time;
    }

    setTranslateY(y);
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}, [items.length]);
  if (!items.length) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 pt-4 border border-gray-300 bg-neutral-100 ml-20 mt-10">
  {/* Header */}
<div className="flex justify-start mb-4">
  <div className="bg-orange-600 text-white px-4 py-2 text-sm font-bold uppercase">
    HOTEST NEWS
  </div>
</div>

  {/* News List */}
  <div className="relative h-90 overflow-hidden">
  <div
    ref={containerRef}
    className="absolute inset-0 flex flex-col"
    style={{ transform: `translateY(${translateY}px)` }}
  >
    {[...items, ...items].map((item, index) => (
      <div
        key={index}
        className="border-b border-dashed border-gray-400"
      >
        <NewsRow item={item} />
      </div>
    ))}
  </div>
</div>
</div>
  );
}

function NewsRow({ item }: { item: NewsItem }) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/${item.slug}`)}
      className="flex items-start gap-4 px-8 py-4 min-h-[60px]">

      <div className="flex-1">
        <h3 className="font-bold text-lg cursor-pointer line-clamp-1">{item.title}</h3>
      </div>
    </div>
  );
}