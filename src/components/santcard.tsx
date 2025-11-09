// src/components/santcard.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"; 
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation"; // ✅ replace useNavigate

interface SantCardProps {
  name: string;
  description: string;
  image: string;
}

export default function SantCard({ name, description, image }: SantCardProps) {
  const router = useRouter(); // ✅ Next.js navigation

  const handleClick = () => {
    router.push(`/sant/${name.toLowerCase()}`);
  };

  return (
    <Card className="overflow-hidden shadow-md border-4 border-[#f97316] rounded-md hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white">
      <img
        src={image}
        alt={name}
        className="h-48 w-full object-cover rounded-t-md"
      />
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#f97316] font-serif">
          Sant {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 text-sm">{description}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleClick}
          className="bg-[#f97316] hover:bg-[#f97316]/90 text-white w-full rounded-b-md"
        >
          View Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
}