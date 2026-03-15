"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import ArticleModal from "./article-modal";
interface ArticleCardProps {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
}

export default function ArticleCard({
  title,
  content,
  created_at,
  image_url,
}: ArticleCardProps) {
  const [open, setOpen] = useState(false);
  const excerpt = getExcerpt(content);
  return (
    <>
      <Card
        className="
          cursor-pointer
          border-4 border-[#f97316]
          rounded-md
          hover:shadow-lg
          transition-all
          bg-white
        "
      >
        {/* Image / Title placeholder */}
<div className="relative w-full h-40 bg-gray-100 rounded-md flex items-center justify-center">
  {image_url ? (
    <Image
      src={image_url}
      alt="Article preview"
      fill
      className="object-contain rounded-md"
      sizes="(max-width: 768px) 100vw, 400px"
    />
  ) : (
    <h3 className="text-[#f97316] font-serif text-lg text-center px-4">
      {title}
    </h3>
  )}
</div>

        <CardHeader>
          <CardTitle className="text-lg text-[#f97316] font-serif text-center">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-700 text-center mb-2">
            {excerpt}
          </p>

          <p className="text-xs text-gray-500 text-center">
            {new Date(created_at).toLocaleDateString("mr-IN")}
          </p>
        </CardContent>

        <CardFooter className="justify-center">
          <button
            onClick={() => setOpen(true)}
            className="bg-[#f97316] hover:bg-[#f97316]/90 text-white font-semibold px-4 py-2 rounded-md"
          >
            लेख वाचा
          </button>
        </CardFooter>
      </Card>

      {/* Modal */}
      <ArticleModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        content={content}
      />
    </>
  );
}

/* helper */
const getExcerpt = (text: string, wordLimit = 12) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};