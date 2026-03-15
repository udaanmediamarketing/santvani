
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface CategoryCount {
  category: string;
  count: number;
}

interface CategoryListProps {
  onSelectCategory?: (category: string) => void | Promise<void>;
  layout?: "horizontal" | "vertical";
}

const DEFAULT_CATEGORIES = [
  "किर्तन",
  "भजन",
  "श्लोक",
  "सामुदायिक ध्यान",
  "सामुदायिक प्रार्थना",
];

export default function CategoryList({
  onSelectCategory,
  layout = "horizontal",
}: CategoryListProps) {
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:5000/api/posts/list-by-category")
      .then((res) => res.json())
      .then((data: CategoryCount[]) => {
        const updated = DEFAULT_CATEGORIES.map((cat) => {
          const found = data.find((d) => d.category === cat);
          return { category: cat, count: found ? found.count : 0 };
        });
        setCategories(updated);
      })
      .catch(console.error);
  }, []);

  const handleClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    } else {
      router.push(`/category/${encodeURIComponent(category)}`);
    }
  };

  return (
    <div
      className={
        layout === "vertical"
          ? "flex flex-col items-start gap-3 mt-2"
          : "flex flex-wrap justify-center gap-4 mt-1"
      }
    >
      {categories.map(({ category, count }) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className="
            flex items-center gap-2
            px-5 py-2
            rounded-full
            bg-orange-100
            text-orange-700
            font-medium
            cursor-pointer
            transition
            hover:bg-orange-500
            hover:text-white
            hover:scale-105
            shadow-sm
          "
        >
          {category}
          <span className="text-xs bg-white/70 px-2 py-0.5 rounded-full">
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}
