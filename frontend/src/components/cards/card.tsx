'use client';

import { Card } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface DynamicCardProps {
  href?: string;
  imageSrc?: string;
  youtubeUrl?: string;
  title: string;
  category: string;
  date: string;
  layout?: 'row' | 'column';
  variant?: 'main' | 'side';
  className?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageFit?: 'cover' | 'contain';
  bgWhite?: boolean;
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
  imageWidth = 'w-66',
  imageHeight = 'h-48',
  imageFit = 'cover',
  bgWhite = false,
}: DynamicCardProps) {
  const embedUrl = youtubeUrl ? getYoutubeEmbedUrl(youtubeUrl) : null;
  const isRow = layout === 'row';

  return (
    <Card
      className={cn(
        'relative border-0 shadow-none p-0',
        bgWhite && "bg-white",
        className
      )}
    >
      <div className={cn(isRow ? 'flex gap-3' : 'flex flex-col')}>
        {/* Image */}
        <div className={cn("relative flex-shrink-0", imageWidth, imageHeight)}>
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className={cn(
  imageFit === "cover" && "object-cover",
  imageFit === "contain" && "object-contain"
)}
            />
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className={cn(
  imageFit === "cover" && "object-cover",
  imageFit === "contain" && "object-contain"
)}
              allowFullScreen
            />
          ) : null}
        </div>

        {/* Content */}
        <div className="flex flex-col self-start space-y-2">
          {/* Category */}
          <span className="text-xs font-semibold text-white ml-2 mt-2 bg-orange-700 px-2 py-1 w-fit">
            {category}
          </span>

          {/* Title */}
          <h3 className="text-sm font-bold leading-snug line-clamp-3 mt-1">
            {title}
          </h3>

          {/* Date */}
          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
        </div>
      </div>

      {href && (
        <Link
          href={href}
          className="absolute inset-0 z-10"
          aria-label={`Open ${title}`}
        />
      )}
    </Card>
  );
}