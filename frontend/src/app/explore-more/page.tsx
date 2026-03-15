"use client";

import Link from "next/link";

export default function ExploreMore() {
  return (
    <div className="min-h-screen bg-[#def1de] p-4 sm:p-6">

      {/* 🔶 Sant Header */}
      <div className="max-w-6xl mx-auto bg-white border-4 border-[#f97316] rounded-md shadow-xl p-6">

        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#f97316] font-serif">
          संत तुकाराम
        </h1>

        <p className="text-center mt-3 text-blue-800 text-sm sm:text-base">
          अभंगांच्या माध्यमातून भक्ती व प्रेमाचे संदेश देणारे पूजनीय मराठी संत.
        </p>

        {/* 🔶 Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ================= LEFT : Small Post Images ================= */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white border rounded-md shadow hover:shadow-lg transition"
              >
                <img
                  src="/images/santTukaram.jpg"
                  alt="संत तुकाराम"
                  className="w-full h-28 object-cover rounded-t-md"
                />
                <div className="p-2 text-xs text-center font-medium text-gray-700">
                  अभंग वाणी – पोस्ट {i}
                </div>
              </div>
            ))}
          </div>

          {/* ================= RIGHT : Navigation + Videos ================= */}
          <div className="lg:col-span-2 space-y-8">

            {/* 🔹 Category Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "कीर्तन",
                "भजन",
                "श्लोक",
                "सामुदायिक ध्यान",
                "सामुदायिक प्रार्थना",
              ].map((item) => (
                <Link
                  key={item}
                  href={`/sant/tukaram/${item}`}
                >
                  <div className="cursor-pointer text-center px-4 py-2 border-2 border-[#f97316] rounded-md text-[#f97316] font-semibold hover:bg-orange-50 transition text-sm">
                    {item}
                  </div>
                </Link>
              ))}
            </div>

            {/* 🔹 YouTube Video Players */}
            <div>
              <h2 className="text-2xl font-semibold text-[#f97316] mb-4">
                🎥 कीर्तन / भजन व्हिडिओ
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Video 1 */}
                <iframe
                  className="w-full h-56 rounded-md border shadow"
                  src="https://www.youtube.com/embed/V5q64s4pS6U"
                  title="Sant Tukaram Kirtan"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* Video 2 */}
                <iframe
                  className="w-full h-56 rounded-md border shadow"
                  src="https://www.youtube.com/embed/MugpDZm-nrE"
                  title="Sant Tukaram Bhajan"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
