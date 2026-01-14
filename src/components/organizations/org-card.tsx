"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { Youtube } from "lucide-react";

interface OrgCardProps {
  orgName: string;
  orgType?: string | null;
  headName: string;
  city: string;
  state: string;
  createdAt: string;
  imageUrl?: string | null;
  youtubeUrl?: string | null;
}

export default function OrgCard({
  orgName,
  orgType,
  headName,
  city,
  state,
  createdAt,
  imageUrl,
  youtubeUrl,
}: OrgCardProps) {
  return (
    <Card className="border-2 border-[#f97316] hover:shadow-lg transition bg-white">
      {/* Media */}
      <div className="relative h-40 bg-orange-50 flex items-center justify-center rounded-t-md">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={orgName}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : youtubeUrl ? (
          <iframe
            className="w-full h-full rounded-t-md"
            src={`https://www.youtube.com/embed/${extractYouTubeId(
              youtubeUrl
            )}`}
            allowFullScreen
          />
        ) : (
          <div className="text-[#f97316] font-serif text-md" >
             {orgName}
          </div>
        )}
      </div>

      <CardHeader className="text-center pb-2">
        <CardTitle className="text-[#f97316] font-serif text-md">
          स्थापित: {orgName}
        </CardTitle>
        {orgType && (
          <p className="text-md text-gray-500">{orgType}</p>
        )}
      </CardHeader>

      <CardContent className="text-md text-center space-y-1">
        <p>प्रमुख: {headName}</p>
        <p>स्थान: {city}, {state}</p>
        <p className="text-gray-500 text-md">
          {new Date(createdAt).toLocaleDateString("mr-IN")}
        </p>
      </CardContent>
    </Card>
  );
}

/* helper */
const extractYouTubeId = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/i
  );
  return match?.[1] ?? "";
};