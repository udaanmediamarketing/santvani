'use client';

import { Card, CardHeader, CardTitle } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from "lucide-react";
interface DynamicCardProps {
  href?: string;
  imageSrc?: string;
  youtubeUrl?: string;
  title: string;
  category: string;
  date: string;
  description?: string;
  layout?: 'row' | 'column';
  className?: string;
}

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function DynamicCard({
  href,
  imageSrc,
  youtubeUrl,
  title,
  category,
  date,
  layout = 'row',
  className,
}: DynamicCardProps) {
  const embedUrl = youtubeUrl ? getYoutubeEmbedUrl(youtubeUrl) : null;

  return (
    <Card
      className={cn(
        "relative hover:shadow-xl transition-all duration-300 border-4 border-[#f97316] rounded-md p-2 bg-neutral-50",
        layout === 'row'
          ? "w-3/4 h-50 max-w-none"
          : "w-full max-w-sm",
        className
      )}
    >
      <div
        className={cn("flex w-full h-full", {
          "flex-row gap-4 items-stretch": layout === 'row',
          "flex-col": layout === 'column',
        })}
      >
        {/* Media */}
        <div className={cn(
    "relative flex-shrink-0",
    layout === "row"
      ? "w-40 md:w-56 h-32 md:h-44"
      : "w-full h-50"
  )}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className={cn(
                "object-cover rounded-lg shadow-md",
              )}
            />
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title="YouTube video"
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          ) : null}
        </div>

        {/* Content */}
        <div
          className={cn("flex-1 min-w-0 flex flex-col", {
            "py-3 px-2 pt-4": layout === 'row',
            "p-2 ": layout === 'column',
          })}
        >
          <CardHeader className="pl-4 items-start flex flex-col">
  <CardTitle
    className={cn(
      "text-lg font-bold leading-tight",
      layout === "column" && "line-clamp-2 min-h-[5rem]"
    )}
  >
    {title}
  </CardTitle>

  <div className="flex flex-col items-start gap-1 text-xs pt-1">
     <span className="bg-orange-700 backdrop-blur px-3 py-1 text-white rounded-full text-sm font-bold"> {category} </span> 
    {date && (
  <div className="flex items-center gap-1 pt-2 text-base opacity-90">
    <Calendar size={22} />
    <span>{date}</span>
  </div>
)}
  </div>
</CardHeader>
{href && (
        <Link
          href={href}
          className="absolute inset-0 z-30 cursor-pointer"
          aria-label={`Open ${title}`}
        />
      )}
        </div>
      </div>
    </Card>
  );
}