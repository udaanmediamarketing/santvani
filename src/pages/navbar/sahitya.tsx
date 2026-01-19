import Link from "next/link";

const sahityaItems = [
  "चरित्र",
  "हरिपाठ",
  "भजन",
  "प्रवचने",
  "अभंग",
  "आरती",
  "श्लोक",
  "सुविचार",
];

export default function SahityaMenu() {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg p-4 space-y-2">
      {sahityaItems.map((item) => (
        <Link
          key={item}
          href={`/sahitya/${encodeURIComponent(item)}`}
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
