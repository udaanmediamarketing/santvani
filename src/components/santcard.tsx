// "use client";

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { useRouter } from "next/router";

// interface SantCardProps {
//   name: string;
//   description: string;
//   image: string;
//   setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
// }

// export default function SantCard({
//   name,
//   description,
//   image,
//   setActiveMenu,
// }: SantCardProps) {
//   const router = useRouter();

//   const handleClick = () => {
//     setActiveMenu("home");
//     router.push(`/sant/${name.toLowerCase()}`);
//   };

//   return (
//     <Card
//       className="
//         min-h-[520px]
//         overflow-hidden
//         shadow-md
//         border-4 border-[#f97316]
//         rounded-md
//         hover:shadow-lg
//         transition-shadow
//         duration-300
//         cursor-pointer
//         bg-white
//       "
//     >
//       {/* 🔧 Taller Image Section */}
//       <div className="w-full h-[280px] overflow-hidden">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <CardHeader>
//         <CardTitle className="text-lg font-semibold text-[#f97316] font-serif text-center">
//           संत {name}
//         </CardTitle>
//       </CardHeader>

//       {/* 🔧 Increased content height */}
//       <CardContent className="flex-1">
//         <p className="text-gray-700 text-sm leading-relaxed text-center">
//           {description}
//         </p>
//       </CardContent>

//       <CardFooter>
//         <Button
//           onClick={handleClick}
//           className="bg-[#f97316] hover:bg-[#f97316]/90 text-white w-full rounded-b-md"
//         >
//           डॅशबोर्ड पाहा
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
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
}

export default function SantCard({
  name,
  description,
  image,
  setActiveMenu,
}: SantCardProps) {
  const router = useRouter();

  const handleClick = () => {
    setActiveMenu("home");
    router.push(`/sant/${name.toLowerCase()}`);
  };

  return (
    <Card
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
      {/* ✅ AUTO-HEIGHT IMAGE SECTION */}
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
