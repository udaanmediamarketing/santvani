import Link from "next/link";
import { Button } from "../components/ui/button";

const Navbar = () => {
  const sants = ["Tukaram", "Eknath", "Namdev", "Dnyaneshwar"];

  return (
    <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">🕉️ SantVani</h1>
      <div className="flex gap-3">
        
        <Button asChild variant="secondary">
          <Link href="/">Home</Link>
        </Button>

        {sants.map((sant) => (
          <Button key={sant} asChild variant="ghost">
            <Link href={`/sant/${sant.toLowerCase()}`}>{sant}</Link>
          </Button>
        ))}

        <Button asChild variant="secondary">
          <Link href="/create-article">Create Article</Link>
        </Button>

      </div>
    </nav>
  );
};

export default Navbar;