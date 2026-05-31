'use client';

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
  content?: string;
  showContent?: boolean;
  date: string;
  layout?: 'row' | 'column';
  variant?: 'main' | 'side';
  className?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageFit?: 'cover' | 'contain';
  bgWhite?: boolean;
  text?: string,
  size?: string,
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
  content,
  showContent = false,
  date,
  layout = 'row',
  className,
  imageWidth = 'w-[300px]',
  imageHeight = 'h-[200px]',
  imageFit = 'cover',
  bgWhite = false,
  text = 'black',
  size = 'text-[18px]',
}: DynamicCardProps) {
  const embedUrl = youtubeUrl ? getYoutubeEmbedUrl(youtubeUrl) : null;
  const isRow = layout === 'row';

  return (
    // <Card
    //   className={cn(
    //     'relative border-0 shadow-none p-0 rounded-none',
    //     bgWhite && 'bg-white',
    //     className
    //   )}
    // >
     <> 
      <div
        className={cn(
          isRow ? 'flex items-start gap-3' : 'flex flex-col'
        )}
      >
        {/* Image */}
        {/* <div
          className={cn(
            'relative flex-shrink-0 overflow-hidden',
            imageWidth,
            imageHeight
          )}
        > */}
        <div
  className={cn(
    'relative flex-shrink-0 overflow-hidden bg-gray-100 group',
    imageWidth,
    imageHeight,
  )}
>
          {imageSrc ? (
            <Image
  src={imageSrc}
  alt={title}
  fill
  sizes="100vw"
  className="object-cover group-hover:scale-105 transition-transform"
/>
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className={cn(
                'w-full h-full',
                imageFit === 'cover' && 'object-cover',
                imageFit === 'contain' && 'object-contain'
              )}
              allowFullScreen
            />
          ) : null}
        </div>

        {/* Content */}
        <div className="flex flex-col items-start text-left pt-2">
          {/* Title */}
<h3
  className={cn(
    "w-full text-left leading-[1.35] font-bold mb-3",
    text, size
  )}
>
  {title}
</h3>          {/* Category + Date */}
          <div className="w-full flex flex-wrap items-center gap-3 mb-3">
            {/* Category */}
            <span className="bg-orange-600 text-white text-[12px] font-semibold px-3 py-[5px] leading-none text-left">
              {category}
            </span>

            {/* Date */}
            <div className={cn("flex items-center gap-1 text-[14px]", text)}>
  <span>By - Tukadyadas</span>

  <Calendar size={14} strokeWidth={2} />

  <span>{date}</span>
</div>
          </div>

          {/* Content */}
          {showContent && content && (
            <p className="w-full text-left text-[14px] leading-[1.7] text-black line-clamp-2">
              {content.length > 200
                ? `${content.slice(0, 200)}...`
                : content}
            </p>
          )}
        </div>

      </div>

      {href && (
        <Link
          href={href}
          className="absolute"
          aria-label={`Open ${title}`}
        />
      )}
    </>
    // </Card>
  );
}