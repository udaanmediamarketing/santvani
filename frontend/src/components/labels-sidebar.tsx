"use client";

import { cn } from "../lib/utils";

interface Category {
  id: string;
  name: string;
}

const defaultCategories: Category[] = [
  { id: "1", name: "किर्तन" },
  { id: "2", name: "भजन" },
  { id: "3", name: "श्लोक" },
  { id: "4", name: "सामुदायिक ध्यान" },
  { id: "5", name: "सामुदायिक प्रार्थना" },
];

interface LabelSidebarProps {
  categories?: Category[];
  onSelectCategory?: (category: string) => void;
  className?: string;
}

export default function LabelSidebar({
  categories = defaultCategories,
  onSelectCategory,
  className,
}: LabelSidebarProps) {
  return (
    <div className={cn("border border-gray-200 bg-white", className)}>
      {/* Header Section */}
      <div className="pt-6 px-6">
        <div className="flex items-end">
          {/* Orange label - matches image weight */}
          <div className="bg-orange-600 text-white px-3 py-1.5 text-md font-semibold uppercase tracking-wider">
            Labels
          </div>
          {/* Line continues from label */}
          <div className="flex-1 border-b border-gray-300 mb-[1px]" />
        </div>
      </div>

      {/* Tag Cloud Section */}
      <div className="px-6 py-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory?.(category.name)}
            className="flex items-center gap-1 bg-orange-100 px-2 py-1 transition-colors duration-200 hover:bg-orange-500 group"
          >
            {/* The » icon - turns dark orange on hover */}
            <span className="text-orange-600 text-xl leading-none group-hover:text-white">
              »
            </span>

            {/* Label Text - turns dark orange on hover */}
            <span className="text-orange-700 text-sm group-hover:text-white">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}