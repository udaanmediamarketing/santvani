// "use client";

// import Link from "next/link";
// import { useTranslations } from "next-intl";
// import { Button } from "../components/ui/button";

// export default function Navbar() {
//   const t = useTranslations("navbar");

//   const sants = ["tukaram", "eknath", "namdev", "dnyaneshwar"];

//   return (
//     <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center">
//       <h1 className="text-xl font-bold tracking-wide">{t("title")}</h1>

//       <div className="flex gap-3">

//         <Button asChild variant="secondary">
//           <Link href="/">{t("home")}</Link>
//         </Button>

//         {sants.map((s) => (
//           <Button key={s} asChild variant="ghost">
//             <Link href={`/sant/${s}`}>{t(`sants.${s}`)}</Link>
//           </Button>
//         ))}

//         <Button asChild variant="secondary">
//           <Link href="/create-article">{t("createArticle")}</Link>
//         </Button>

//         <Button asChild variant="secondary">
//           <Link href="/list-articles">{t("listArticles")}</Link>
//         </Button>
//       </div>
//     </nav>
//   );
// }

"use client";
import Link from "next/link";
import { Button } from "../components/ui/button";

const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];

const Navbar = () => {
  return (
    <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">🕉️ संतवाणी</h1>

      <div className="flex gap-3">
        <Link href="/">
          <Button variant="secondary" className="text-white hover:bg-gray-100 hover:text-black">
            मुख्य पान
          </Button>
        </Link>

        {sants.map((sant) => (
          <Link key={sant} href={`/sant/${sant}`}>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              {sant}
            </Button>
          </Link>
        ))}

        <Link href="/create-article">
          <Button variant="secondary" className="text-white hover:bg-white/20">
            लेख तयार करा
          </Button>
        </Link>

                <Link href="/list-articles">
          <Button variant="secondary" className="text-white hover:bg-white/20">
            लेखांची यादी
          </Button>
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;