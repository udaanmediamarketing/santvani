"use client";

import React, { useState } from "react";
import { X, Download, Share2 } from "lucide-react";

type Book = {
  title: string;
  pdf: string;
  cover: string;
};

const books: Book[] = [
  {
    title: "ज्ञानेश्वरी",
    pdf: "/pdfs/dnyaneshwari.pdf",
    cover: "/sant/dnyaneshwari.jpg",
  },
  {
    title: "दासबोध",
    pdf: "/pdfs/dasbodh.pdf",
    cover: "/sant/dasbodh.jpg",
  },

  {
    title: "रामायण",
    pdf: "/pdfs/ramayan.pdf",
    cover: "/sant/ramayan.jpg",
  },
  {
    title: "श्रीमद्भगवद्गीता",
    pdf: "/pdfs/bhagavadgita.pdf",
    cover: "/sant/bhagavadgita.jpg",
  },
];

export default function Granth() {
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  const shareBook = () => {
    if (!activeBook) return;

    const link =
      window.location.origin +
      window.location.pathname +
      "?book=" +
      encodeURIComponent(activeBook.title);

    const text = `📖 पवित्र ग्रंथ वाचा\n${activeBook.title}\n${link}`;

    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Link copied successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-orange-500 text-white px-6 py-14">
      <h1 className="text-center text-3xl font-bold mb-12 text-gray-800">
        📚 ग्रंथ पुस्तकालय
      </h1>

      {/* BOOK GRID */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {books.map((book) => (
          <div
            key={book.title}
            onClick={() => setActiveBook(book)}
            className="
            bg-[#111]
            rounded-2xl
            p-4
            text-center
            shadow-[0_25px_50px_rgba(0,0,0,0.7)]
            cursor-pointer
            transition-all
            duration-500
            transform
            hover:scale-105
            hover:rotate-y-12
            hover:rotate-x-6
            hover:shadow-[0_40px_70px_rgba(255,215,0,0.35)]
          "
          >
            {/* IMAGE */}
            <div className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-black mb-3">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-contain"
              />
            </div>

            <h5 className="text-yellow-400 font-semibold">
              {book.title}
            </h5>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {activeBook && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="bg-[#111] rounded-xl w-full max-w-6xl overflow-hidden shadow-2xl">
            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-yellow-400">
                {activeBook.title}
              </h2>
              <button onClick={() => setActiveBook(null)}>
                <X className="text-white hover:text-red-400" />
              </button>
            </div>

            {/* PDF VIEWER */}
            <div className="p-4">
              <iframe
                src={activeBook.pdf}
                className="w-full h-[520px] rounded-lg"
              />
            </div>

            {/* FOOTER */}
            <div className="flex justify-between px-4 py-3 border-t border-gray-700">
              <a
                href={activeBook.pdf}
                download
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white"
              >
                <Download size={18} /> PDF डाउनलोड
              </a>

              <button
                onClick={shareBook}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
              >
                <Share2 size={18} /> शेअर
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}
