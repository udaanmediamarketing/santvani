'use client';

import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from "lucide-react";
interface NewSantCardProps {
  href?: string;
  imageSrc?: string;
  youtubeUrl?: string;
  title?: string;
  content?: string;
  date?: string;
  className?: string;
  category?: string;
}

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export function NewSantCard({
  href,
  imageSrc,
  youtubeUrl,
  title = "भजन - सुबसधि तया जगी ना दिसी जान हे",
  content = "नवें बरसै ॥",
  date,
  className = "",
  category,
}: NewSantCardProps) {
  const embedUrl = youtubeUrl ? getYoutubeEmbedUrl(youtubeUrl) : null;
  return (

<Card
  className={`relative overflow-hidden shadow-xl border-0 bg-black w-[100%] ${className}`}
>
  {/* IMAGE */}
  {imageSrc && (
    <Image
      src={imageSrc}
      alt={title ?? 'Sant image'}
      fill
      priority={false}
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover z-0"
    />
  )}

  {/* YOUTUBE (fallback) */}
  {!imageSrc && embedUrl && (
    <iframe
      src={embedUrl}
      title="YouTube video"
      className="absolute inset-0 w-full h-full z-0"
      allowFullScreen
    />
  )}

  {/* FALLBACK */}
  {!imageSrc && !embedUrl && (
    <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-rose-400 z-0" />
  )}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
   <CardContent className="
    absolute inset-0 p-3
    flex flex-col justify-end items-start
    text-white text-left font-devanagari
  "> 
  <div className="mb-2"> <span className="bg-orange-700 backdrop-blur px-3 py-1 rounded-full text-sm font-bold"> {category} </span> 
  </div> 
  <h2 className="text-sm font-bold mb-2 drop-shadow-lg"> {title} </h2> 
  {date && (
  <div className="flex items-center gap-1 text-sm opacity-90">
    <Calendar size={18} />
    <span>{date}</span>
  </div>
)}
</CardContent>
{href && (
        <Link
          href={href}
          className="absolute inset-0 z-30 cursor-pointer"
          aria-label={`Open ${title}`}
        />
      )}
</Card>
  );
}