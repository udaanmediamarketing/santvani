"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";

interface SantCardProps {
  name: string;
  description: string;
  image: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
  onClick?: () => void;
}

export default function SantCard({
  name,
  description,
  image,
  setActiveMenu,
  onClick,
}: SantCardProps) {
  const router = useRouter();

  const handleClick = () => {
  if (onClick) {
    onClick();
  } else {
    setActiveMenu("home");
    router.push(`/sant/${name}`);
  }
};

  return (
    <Card
      onClick={handleClick}
      className="
        overflow-hidden
        shadow-md
        border-4 border-[#f97316]
        rounded-md
        hover:shadow-lg
        transition-shadow
        duration-300
        cursor-pointer
        bg-white
      "
    >
      <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#f97316] font-serif text-center">
          संत {name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 text-sm leading-relaxed text-center">
          {description}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleClick}
          className="bg-[#f97316] hover:bg-[#f97316]/90 text-white w-full rounded-b-md"
        >
          डॅशबोर्ड पाहा
        </Button>
      </CardFooter>
    </Card>
  );
}
