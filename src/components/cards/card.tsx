'use client';

import { Card, CardHeader, CardTitle } from '../../components/ui/card';
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
  variant,
  className,
}: DynamicCardProps) {
  const embedUrl = youtubeUrl ? getYoutubeEmbedUrl(youtubeUrl) : null;

  const isRow = layout === 'row';
  const isCompact = isRow && variant === 'side';

  return (
    <Card
      className={cn(
        'relative bg-neutral-50 transition-all',
        isCompact
          ? 'border border-orange-400 p-1 w-full'
          : 'border-4 border-orange-500 p-3 hover:shadow-xl',
        // isRow && 'w-3/4',
        className
      )}
    >
      <div
        className={cn(
          isRow ? 'flex flex-row gap-4' : 'flex flex-col'
        )}
      >
        {/* Media */}
        <div
          className={cn(
            'relative z-20 overflow-hidden rounded-md',
            isCompact
              ? 'w-20 h-20'
              : isRow
              ? 'w-40 md:w-56 h-40 md:h-44'
              : 'w-full h-56'
          )}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
            />
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full rounded-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-neutral-500">
              No media available
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className={cn(
            'flex flex-col min-w-0',
            isCompact ? 'p-1' : 'px-2 py-3'
          )}
        >
          <CardHeader className={cn('p-0', !isCompact && 'pl-2')}>
            <CardTitle
              className={cn(
                'font-bold leading-tight',
                isCompact
                  ? 'text-xs line-clamp-2'
                  : 'text-lg line-clamp-3'
              )}
            >
              {title}
            </CardTitle>

            <div className="flex flex-col gap-1 pt-4">
              <span
                className={cn(
                  'rounded-full font-semibold w-fit',
                  isCompact
                    ? 'text-[12px] px-2 py-0.5 items-start bg-orange-500 text-white'
                    : 'text-sm px-3 py-1 bg-orange-600 text-white'
                )}
              >
                {category}
              </span>

              {date && !isCompact && (
                <div className="flex items-center gap-1 text-md opacity-80">
                  <Calendar size={14} />
                  <span>{date}</span>
                </div>
              )}
            </div>
          </CardHeader>
        </div>
      </div>

      {href && (
        <Link
          href={href}
          className="absolute inset-0 z-30 "
          aria-label={`Open ${title}`}
        />
      )}
    </Card>
  );
}