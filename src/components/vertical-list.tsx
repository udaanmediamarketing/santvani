"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "../components/ui/badge";

const newsItems = [
  { 
    category: "सामुदायिक प्रार्थना", 
    title: "भजन - भगवत ! लभमक्ता ! तारि बलका ॥",
    subtitle: "जव ऋषि बुध बलवे गजनी शुमारी ! तं देशिष्ठि श्रेही ॥ तुकाराम ऋणी प्रवर्तना",
    extra: ""
  },
  { 
    category: "सामुदायिक ध्यान", 
    title: "भजन - अजगर करता नाही चाकरी",
    subtitle: "ला तै देशिष्ठि श्रेही ॥ तुकाराम ऋणी प्रवर्तना",
    extra: ""
  },
    { 
    category: "सामुदायिक ध्यान", 
    title: "भजन - अजगर करता नाही चाकरी",
    subtitle: "ला तै देशिष्ठि श्रेही ॥ तुकाराम ऋणी प्रवर्तना",
    extra: ""
  },
    { 
    category: "सामुदायिक ध्यान", 
    title: "भजन - अजगर करता नाही चाकरी",
    subtitle: "ला तै देशिष्ठि श्रेही ॥ तुकाराम ऋणी प्रवर्तना",
    extra: ""
  },
    { 
    category: "सामुदायिक ध्यान", 
    title: "भजन - अजगर करता नाही चाकरी",
    subtitle: "ला तै देशिष्ठि श्रेही ॥ तुकाराम ऋणी प्रवर्तना",
    extra: ""
  },
];

interface NewsItem {
  category: string;
  title: string;
  subtitle: string;
  extra: string;
}

export default function VerticalMovingNewsList() {
  const [items] = useState(newsItems);
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const itemHeight = 120; // Fixed height per item

  const speed = 150; // 🔥 increase this value for faster scroll (px/sec)

useEffect(() => {
  let lastTime = 0;
  let y = 0;

  const animate = (time: number) => {
    if (!lastTime) lastTime = time;
    const delta = time - lastTime;
    lastTime = time;

    y -= (speed * delta) / 1000;

    const totalHeight = items.length * itemHeight;

    // Reset smoothly after first list scrolls out
    if (Math.abs(y) >= totalHeight) {
      y = 0;
    }

    setTranslateY(y);
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}, [items.length]);

  return (
    // <div className="w-full bg-gradient-to-r from-orange-50 to-rose-50 mt-3 border-y border-orange-200/50 shadow-lg py-12">
      <div className="max-w-4xl mx-auto px-6 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg">
            <span className="font-bold text-lg uppercase tracking-wider">हॉटेस्ट न्यूज</span>
          </div>
        </div>

        {/* Moving List Container */}
        <div className="relative h-[300px] overflow-hidden rounded-3xl border-4 border-orange-200/70 bg-white/90 backdrop-blur-xl shadow-2xl">
          <div 
            ref={containerRef}
            className="absolute inset-0 flex flex-col transition-transform duration-[25s] ease-linear"
            style={{ transform: `translateY(${translateY}px)` }}
          >
            {/* First set */}
            {items.map((item, index) => (
              <div
                key={`first-${index}`}
                className="flex items-start gap-4 px-8 py-4 hover:bg-orange-50/50 border-b border-orange-100/50 min-h-[120px] first:border-t"
              >
                {/* Category Badge */}
                <Badge className="bg-gradient-to-br from-orange-500/20 to-rose-500/20 
                                border-orange-300/50 text-orange-900 font-bold px-4 py-2 text-sm 
                                shadow-md whitespace-nowrap min-w-[130px] mt-1">
                  {item.category}
                </Badge>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl leading-tight text-gray-900 mb-2 line-clamp-1 pr-4">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-700 mb-3 line-clamp-2 pr-4">
                    {item.subtitle}
                  </p>
                  {item.extra && (
                    <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold bg-orange-100/60 px-3 py-1 rounded-full border border-orange-200">
                      <span>•</span>
                      <span>{item.extra}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {items.map((item, index) => (
              <div
                key={`second-${index}`}
                className="flex items-start gap-4 px-8 py-6 hover:bg-orange-50/50 border-b border-orange-100/50 min-h-[120px]"
              >
                {/* Category Badge */}
                <Badge className="bg-gradient-to-br from-orange-500/20 to-rose-500/20 
                                border-orange-300/50 text-orange-900 font-bold px-4 py-2 text-sm 
                                shadow-md whitespace-nowrap min-w-[130px] mt-1">
                  {item.category}
                </Badge>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xl leading-tight text-gray-900 mb-2 line-clamp-1 pr-4">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-gray-700 mb-3 line-clamp-2 pr-4">
                    {item.subtitle}
                  </p>
                  {item.extra && (
                    <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold bg-orange-100/60 px-3 py-1 rounded-full border border-orange-200">
                      <span>•</span>
                      <span>{item.extra}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Overlay gradient for smooth edges */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/90 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/90 to-transparent" />
          </div>
        </div>
      </div>
    // </div>
  );
}