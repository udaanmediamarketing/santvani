// import Link from "next/link";

// const sahityaItems = [
//   "चरित्र",
//   "हरिपाठ",
//   "भजन",
//   "प्रवचने",
//   "अभंग",
//   "आरती",
//   "श्लोक",
//   "सुविचार",
// ];

// export default function SahityaMenu() {
//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">

//       {/* 🔷 Main Layout */}
//       <div className="flex flex-col lg:flex-row gap-6">

//         {/* ⬅️ LEFT: Menu */}
//         <div className="w-full lg:w-1/4">
//           <div className="bg-white rounded-lg shadow-lg p-4 space-y-2 sticky top-20">
//             <h3 className="text-lg font-semibold text-orange-600 mb-2">
//               साहित्य
//             </h3>

//             {sahityaItems.map((item) => (
//               <Link
//                 key={item}
//                 href={`#${item}`}
//                 className="
//                   block
//                   px-4 py-2
//                   rounded-md
//                   text-gray-800
//                   hover:bg-orange-100
//                   hover:text-orange-600
//                   transition
//                 "
//               >
//                 {item}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* ➡️ RIGHT: Static Content */}
//         <div className="w-full lg:w-3/4 space-y-10">

//           {/* चरित्र */}
//           <section id="चरित्र">
//             <h2 className="text-2xl font-bold text-orange-600 mb-2">चरित्र</h2>
//             <p className="text-gray-700 leading-relaxed">
//               संतांचे जीवनचरित्र म्हणजे त्यांचे विचार, आचार आणि समाजासाठी दिलेले
//               योगदान. संत तुकाराम, ज्ञानेश्वर, नामदेव यांचे चरित्र आपल्याला
//               आत्मिक प्रेरणा देते.
//             </p>
//           </section>

//           {/* हरिपाठ */}
//           <section id="हरिपाठ">
//             <h2 className="text-2xl font-bold text-orange-600 mb-2">हरिपाठ</h2>
//             <p className="text-gray-700 leading-relaxed">
//               हरिपाठ हा भक्तीचा मार्ग असून नामस्मरणातून मनाची शुद्धी आणि
//               एकाग्रता साधली जाते.
//             </p>
//           </section>

//           {/* भजन */}
//           <section id="भजन">
//             <h2 className="text-2xl font-bold text-orange-600 mb-2">भजन</h2>
//             <p className="text-gray-700 leading-relaxed">
//               भजनातून ईश्वराशी संवाद साधला जातो. शब्द, स्वर आणि भाव यांचा सुंदर
//               संगम म्हणजे भजन.
//             </p>
//           </section>

//           {/* प्रवचने */}
//           <section id="प्रवचने">
//             <h2 className="text-2xl font-bold text-orange-600 mb-2">प्रवचने</h2>
//             <p className="text-gray-700 leading-relaxed">
//               प्रवचनांमधून संतांचे तत्त्वज्ञान, जीवनमूल्ये आणि व्यवहारातील
//               अध्यात्म उलगडले जाते.
//             </p>
//           </section>

//           {/* अभंग */}
//           <section id="अभंग">
//             <h2 className="text-2xl font-bold text-orange-600 mb-2">अभंग</h2>
//             <p className="text-gray-700 leading-relaxed">
//               अभंग हे संतपरंपरेचे अमूल्य धन आहे. साध्या शब्दांत गहन अर्थ
//               सांगणारी रचना म्हणजे अभंग.
//             </p>
//           </section>

//           {/* आरती */}
//           <section id="आरती">
//             <h2 className="text-2xl font-bold text-orange-600 mb-2">आरती</h2>
//             <p className="text-gray-700 leading-relaxed">
//               आरती ही उपासनेची एक पद्धत असून भक्तीभावाने ईश्वराचे स्मरण
//               केले जाते.
//             </p>
//           </section>

//           {/* श्लोक */}
//           <section id="श्लोक">
//             <h2 className="text-2xl font-bold text-orange-600 mb-2">श्लोक</h2>
//             <p className="text-gray-700 leading-relaxed">
//               श्लोक हे संस्कृत वाङ्मयाचे सौंदर्य आहे. त्यामध्ये जीवनाचे
//               तत्त्वज्ञान संक्षेपात मांडलेले असते.
//             </p>
//           </section>

//           {/* सुविचार */}
//           <section id="सुविचार">
//             <h2 className="text-2xl font-bold text-orange-600 mb-2">सुविचार</h2>
//             <p className="text-gray-700 leading-relaxed">
//               सुविचार मनाला सकारात्मक दिशा देतात आणि दैनंदिन जीवनात
//               योग्य निर्णय घेण्यास मदत करतात.
//             </p>
//           </section>

//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function SahityaPage() {
  const [activeCategory, setActiveCategory] = useState("चरित्र");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* 🔶 CATEGORY SELECTOR */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {sahityaItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`
              px-5 py-2 rounded-full font-medium transition-all duration-300
              ${
                activeCategory === item
                  ? "bg-orange-500 text-white scale-105 shadow-lg"
                  : "bg-orange-100 text-orange-700 hover:bg-orange-200"
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>

      {/* 🔥 3D FLIP + SLIDER */}
      <div className="flex justify-center perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="
              w-full md:w-4/5 lg:w-3/4
              bg-white rounded-2xl p-6
              shadow-2xl
              [transform-style:preserve-3d]
            "
          >
            <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center">
              {activeCategory}
            </h2>

            {/* 📜 HORIZONTAL SLIDER */}
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 min-w-max">
                {getList(activeCategory).map((item, index) => (
                  <div
                    key={index}
                    className="
                      min-w-[260px]
                      bg-orange-50
                      border border-orange-200
                      rounded-xl
                      p-4
                      shadow-md
                      hover:shadow-xl
                      transition
                      hover:-translate-y-1
                    "
                  >
                    <p className="text-gray-700 font-serif leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* 🔹 CATEGORY WISE LIST DATA */
function getList(category: string): string[] {
  switch (category) {
    case "चरित्र":
      return [
        "संत तुकाराम महाराजांचे जीवनचरित्र",
        "संत ज्ञानेश्वरांचे अल्पायुष्यातील महान कार्य",
        "संत नामदेवांची भक्तीपर परंपरा",
      ];

    case "हरिपाठ":
      return [
        "हरिपाठाचे महत्व",
        "नामस्मरणाची साधना",
        "दैनंदिन जीवनातील हरिपाठ",
      ];

    case "भजन":
      return [
        "विठ्ठल नामाचा गजर",
        "भक्तीभावाने गायलेली भजने",
        "सामूहिक भजन परंपरा",
      ];

    case "प्रवचने":
      return [
        "जीवनमूल्यांवरील प्रवचने",
        "अध्यात्म आणि व्यवहार",
        "समाजासाठी संतांचे संदेश",
      ];

    case "अभंग":
      return [
        "पांडुरंगावरचे अभंग",
        "वैराग्यपर अभंग",
        "साधेपणातील गहन अर्थ",
      ];

    case "आरती":
      return [
        "विठ्ठल आरती",
        "संत आरती",
        "दैनिक आरती परंपरा",
      ];

    case "श्लोक":
      return [
        "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ॥",
        "उद्धरेदात्मनाऽत्मानं नात्मानमवसादयेत् ॥",
        "श्रद्धावान् लभते ज्ञानम् ॥",
      ];

    case "सुविचार":
      return [
        "जसे विचार तसे आचार",
        "मन शुद्ध असेल तर जीवन सुंदर",
        "सेवा हाच खरा धर्म",
      ];

    default:
      return [];
  }
}
  