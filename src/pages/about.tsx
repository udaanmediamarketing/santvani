import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Heading Section */}
        <section className="text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-4">
            विश्व संत साहित्य
          </h1>
          <p className="text-gray-600 text-lg">
            संत परंपरेचा अमूल्य वारसा – आधुनिक डिजिटल व्यासपीठावर
          </p>
        </section>

        {/* Divider */}
        <div className="h-1 w-24 bg-orange-400 mx-auto rounded-full" />

        {/* About Content */}
        <section className="space-y-6 animate-slide-up">
          <p className="text-gray-700 leading-relaxed text-lg">
            <strong>विश्व संत साहित्य</strong> हे मराठी संत परंपरेतील
            अभंग, भजन, किर्तन, श्लोक आणि आध्यात्मिक विचार
            एकत्र आणणारे एक समर्पित डिजिटल व्यासपीठ आहे.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg">
            या मंचाचा उद्देश केवळ साहित्य सादर करणे नसून,
            संतांच्या विचारधारेला आजच्या पिढीपर्यंत
            सोप्या, सुलभ आणि प्रभावी स्वरूपात पोहोचवणे हा आहे.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-8 animate-slide-up delay-100">
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-orange-500 mb-3">
              आमचे ध्येय
            </h2>
            <p className="text-gray-700 leading-relaxed">
              संत तुकाराम, संत ज्ञानेश्वर, संत नामदेव,
              संत एकनाथ यांसारख्या महान संतांचे
              विचार, अभंग व उपदेश समाजात रुजवणे.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-orange-500 mb-3">
              आमची दृष्टी
            </h2>
            <p className="text-gray-700 leading-relaxed">
              आध्यात्मिक साहित्याचे डिजिटल संग्रहालय तयार करून
              भविष्यातील पिढ्यांसाठी हा वारसा सुरक्षित ठेवणे.
            </p>
          </div>
        </section>

        {/* Saints Section */}
        <section className="animate-slide-up delay-200">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
            प्रमुख संत परंपरा
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {["तुकाराम", "ज्ञानेश्वर", "नामदेव", "एकनाथ"].map((sant) => (
              <div
                key={sant}
                className="bg-orange-100 text-orange-700 text-center py-6 rounded-lg font-semibold hover:bg-orange-200 transition transform hover:-translate-y-1"
              >
                संत {sant}
              </div>
            ))}
          </div>
        </section>

        {/* Closing Message */}
        <section className="text-center animate-fade-in delay-300">
          <p className="text-gray-700 text-lg italic">
            “संतांचे विचार हे केवळ वाचनासाठी नसून
            आचरणासाठी असतात.”
          </p>
        </section>

      </div>
    </div>
  );
}
