"use client";

import { useEffect, useState } from "react";

export default function PageTranslate() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(false);

  // 🔹 Debounced auto-translate while typing
  useEffect(() => {
    if (!text.trim()) {
      setTranslated("");
      return;
    }

    const timer = setTimeout(() => {
      translateText();
    }, 700);

    return () => clearTimeout(timer);
  }, [text, lang]);

  const translateText = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const data = await res.json();
      const output = data[0].map((item: any) => item[0]).join("");
      setTranslated(output);
    } catch {
      setTranslated("⚠️ Translation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-start py-12 px-4 bg-gradient-to-br from-orange-50 to-gray-100 dark:from-zinc-900 dark:to-black">
      <div className="w-full max-w-3xl rounded-2xl bg-white/70 dark:bg-zinc-800/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-8 space-y-6">

        <h1 className="text-3xl font-bold text-center text-orange-500">
          Language Translator
        </h1>

        {/* 🔹 Textarea + Language Selector */}
        <div className="relative flex gap-4">
          <div className="relative flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type here..."
              className="w-full min-h-[200px] p-4 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            {/* Translated overlay text */}
            {translated && (
              <div className="pointer-events-none absolute inset-0 p-4 text-gray-400 dark:text-zinc-500 whitespace-pre-wrap">
                {translated}
              </div>
            )}
          </div>

          {/* Language selector */}
          <div className="w-40 flex flex-col justify-start">
            <label className="mb-1 text-sm font-medium">Language</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="sa">Sanskrit</option>
            </select>
          </div>
        </div>

        {/* 🔹 Translate Button */}
        <button
          onClick={translateText}
          disabled={loading}
          className="w-full py-3 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-60"
        >
          {loading ? "Translating..." : "Translate"}
        </button>
      </div>
    </main>
  );
}
