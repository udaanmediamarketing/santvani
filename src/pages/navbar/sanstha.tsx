import Link from "next/link";

const sansthaItems = [
  "संस्था नोंदणी",
  "मंदिर नोंदणी",
  "तीर्थक्षेत्र नोंदणी",
  "कीर्तनकार नोंदणी",
  "भजनी मंडळी नोंदणी",
  "प्रवचनकार नोंदणी",
  "सामाजिक संस्था नोंदणी",
];

export default function SansthaMenu() {
  return (
    <div className="w-72 bg-white rounded-lg shadow-lg p-4 space-y-2">
      {sansthaItems.map((item) => (
        <Link
          key={item}
          href={`/sanstha/${encodeURIComponent(item)}`}
          className="
            block
            px-4 py-2
            rounded-md
            text-gray-800
            hover:bg-orange-100
            hover:text-orange-600
            transition
          "
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
