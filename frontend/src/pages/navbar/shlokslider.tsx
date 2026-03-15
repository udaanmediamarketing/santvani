"use client";

interface ShlokSliderProps {
  shloks: string[];
}

export default function ShlokSlider({ shloks }: ShlokSliderProps) {
  if (!shloks || shloks.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-orange-100 border-y border-[#f97316] mt-6 py-3">
      <div className="whitespace-nowrap animate-marquee text-[#9a3412] font-serif text-lg sm:text-xl px-4">
        {shloks.join("  ॥  ")}
      </div>
    </div>
  );
}
