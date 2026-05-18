"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { ChevronRight } from "lucide-react";

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

interface CategorySidebarProps {
  categories?: Category[];
  onSelectCategory?: (category: string) => void;
  className?: string;
}

export default function CategorySidebar({
  categories = defaultCategories,
  onSelectCategory,
  className,
}: CategorySidebarProps) {
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const handleClick = (category: Category) => {
    setAnimatingId(category.id);
    
    // Trigger horizontal animation
    setTimeout(() => {
      setAnimatingId(null);
    }, 300);

    onSelectCategory?.(category.name);
  };

  return (
<div className={cn("border border-gray-200 bg-white", className)}>
  {/* Header Section */}
<div className="pt-6 px-6">
  <div className="flex items-end">
    
    {/* Orange label */}
    <div className="bg-orange-600 text-white px-2 py-1 text-md font-semibold uppercase tracking-wider">
      Categories
    </div>

    {/* Line continues from label */}
    <div className="flex-1 border-b-2 border-gray-200 mb-[2px]" />
    
  </div>
</div>
  {/* List Section */}
  <div className="px-6 py-4">
    {categories.map((category, index) => (
      <div key={category.id}>
        <button
          onClick={() => handleClick(category)}
          className="w-full flex items-center justify-between py-2 group bg-transparent transition-all duration-300"
        >
          {/* LEFT SIDE with Slide Animation */}
          <div className="flex items-center gap-3 transition-transform duration-300 ease-out cursor-pointer group-hover:translate-x-3">
            {/* The » icon using a specific font size to match image */}
            <span className="text-orange-600 text-2xl leading-none">
              »
            </span>

            <span className="text-orange-600 font-semibold text-sm">
              {category.name}
            </span>
          </div>

          {/* COUNT BUBBLE */}
          <span className="bg-orange-100 text-orange-600 px-2 py-1 text-sm font-semibold min-w-[25px] rounded-sm">
            {category.count}
          </span>
        </button>

        {/* Dotted line - matches the image spacing */}
        {index < categories.length - 1 && (
          <div className="border-b border-dotted border-gray-400" />
        )}
      </div>
    ))}
  </div>
</div>
  );
}
