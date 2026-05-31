"use client";

import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { useAuthFetch } from "../context/authFetch";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoryCount {
  category: string;
  count: number;
}

interface FooterCategoryProps {
  categories?: Category[];
  onSelectCategory?: (category: string) => void;
  className?: string;
}

export default function FooterCategory({
  categories: initialCategories,
  onSelectCategory,
  className,
}: FooterCategoryProps) {
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>(initialCategories || []);
  const [loading, setLoading] = useState(!initialCategories);
  const authFetch = useAuthFetch();

  useEffect(() => {
    if (initialCategories) return;

    authFetch(`${apiUrl}/api/posts/list-by-category`)
      .then(res => res.json())
      .then((data: CategoryCount[]) => {
        const mappedCategories: Category[] = data.map((cat, index) => ({
          id: `${index + 1}`,
          name: cat.category,
          count: cat.count,
        }));
        setCategories(mappedCategories);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [initialCategories, authFetch]);

  const handleClick = (category: Category) => {
    setAnimatingId(category.id);
    setTimeout(() => setAnimatingId(null), 300);
    onSelectCategory?.(category.name);
  };

  if (loading) {
    return (
      <div className={cn("bg-[#1a162e] p-6 font-sans", className)}>
        <div className="mb-6">
          <h2 className="text-white text-md font-semibold uppercase tracking-wide mb-2">
            Categories
          </h2>
          <div className="border-b border-gray-600 w-full" />
        </div>
        <div className="space-y-0">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="py-2 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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