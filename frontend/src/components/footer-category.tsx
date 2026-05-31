"use client";

import { useState } from "react";
import { cn } from "../lib/utils";

interface Category {
  id: string;
  name: string;
  count: number;
}

const defaultCategories: Category[] = [
  { id: "1", name: "किर्तन", count: 4 },
  { id: "2", name: "भजन", count: 25 },
  { id: "3", name: "श्लोक", count: 3 },
  { id: "4", name: "सामुदायिक ध्यान", count: 1 },
  { id: "5", name: "सामुदायिक प्रार्थना", count: 1 },
];

interface FooterCategoryProps {
  categories?: Category[];
  onSelectCategory?: (category: string) => void;
  className?: string;
}

export default function FooterCategory({
  categories = defaultCategories,
  onSelectCategory,
  className,
}: FooterCategoryProps) {
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const handleClick = (category: Category) => {
    setAnimatingId(category.id);
    setTimeout(() => setAnimatingId(null), 300);
    onSelectCategory?.(category.name);
  };

  return (
    <div className={cn("bg-[#1a162e] p-6 font-sans", className)}>
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-white text-md font-semibold uppercase tracking-wide mb-2">
          Categories
        </h2>
        {/* Solid white line under header */}
        <div className="border-b border-gray-600 w-full" />
      </div>

      {/* List Section */}
      <div className="space-y-0">
        {categories.map((category, index) => (
          <div key={category.id}>
            <button
              onClick={() => handleClick(category)}
              className="w-full flex items-center justify-between py-1 group "
            >
              {/* LEFT SIDE with Slide Animation */}
              <div className="flex items-center gap-3 transition-transform duration-300 ease-out group-hover:translate-x-3
">
                {/* The » icon in white */}
                <span className="text-white text-2xl leading-none">
                  »
                </span>

                <span className="text-white font-semibold text-sm">
                  {category.name}
                </span>
              </div>

              {/* COUNT - Darker bubble with white text */}
              <span className="bg-[#2d2845] text-white text-[10px] font-bold min-w-[24px] rounded-sm shadow-sm">
                {category.count}
              </span>
            </button>

            {/* Solid thin line between rows as shown in image */}
            {index < categories.length - 1 && (
              <div className="border-b border-gray-800" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}