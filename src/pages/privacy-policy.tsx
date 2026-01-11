import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Page Title */}
        <section className="text-center animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-3">
            गोपनीयता धोरण
          </h1>
          <p className="text-gray-600 text-lg">
            तुमची माहिती – आमची जबाबदारी
          </p>
        </section>

        {/* Divider */}
        <div className="h-1 w-28 bg-orange-400 mx-auto rounded-full" />

        {/* Introduction */}
        <section className="animate-slide-up">
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong>विश्व संत साहित्य</strong> या डिजिटल व्यासपीठावर
            आपले स्वागत आहे. वापरकर्त्यांच्या गोपनीयतेचे संरक्षण
            करणे हे आमचे सर्वोच्च प्राधान्य आहे.
            हे गोपनीयता धोरण स्पष्ट करते की आम्ही
            कोणती माहिती गोळा करतो, ती कशी वापरतो
            आणि ती कशी सुरक्षित ठेवतो.
          </p>
        </section>

        {/* Information Collection */}
        <section className="bg-white rounded-xl shadow-md p-6 animate-slide-up delay-100">
          <h2 className="text-2xl font-bold text-orange-500 mb-3">
            1. माहिती संकलन
          </h2>
          <p className="text-gray-700 leading-relaxed">
            आम्ही वापरकर्त्यांकडून थेट कोणतीही वैयक्तिक माहिती
            (जसे की नाव, ई-मेल, फोन नंबर)
            केवळ तेव्हाच गोळा करतो जेव्हा वापरकर्ता
            स्वेच्छेने ती माहिती प्रदान करतो —
            उदाहरणार्थ संपर्क फॉर्म, अभिप्राय किंवा
            नोंदणी प्रक्रियेद्वारे.
          </p>
        </section>

        {/* Use of Information */}
        <section className="bg-white rounded-xl shadow-md p-6 animate-slide-up delay-150">
          <h2 className="text-2xl font-bold text-orange-500 mb-3">
            2. माहितीचा वापर
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>वापरकर्त्यांना उत्तम सेवा प्रदान करण्यासाठी</li>
            <li>वेबसाइटचा अनुभव सुधारण्यासाठी</li>
            <li>वापरकर्त्यांच्या चौकशीस प्रतिसाद देण्यासाठी</li>
            <li>नवीन वैशिष्ट्ये व अपडेट्स कळवण्यासाठी</li>
          </ul>
        </section>

        {/* Data Protection */}
        <section className="bg-white rounded-xl shadow-md p-6 animate-slide-up delay-200">
          <h2 className="text-2xl font-bold text-orange-500 mb-3">
            3. माहितीची सुरक्षा
          </h2>
          <p className="text-gray-700 leading-relaxed">
            वापरकर्त्यांची माहिती सुरक्षित ठेवण्यासाठी
            आम्ही तांत्रिक व प्रशासकीय उपाययोजना वापरतो.
            कोणत्याही अनधिकृत प्रवेश, बदल,
            उघडकीस येणे किंवा नष्ट होण्यापासून
            माहितीचे संरक्षण केले जाते.
          </p>
        </section>

        {/* Third Party */}
        <section className="bg-white rounded-xl shadow-md p-6 animate-slide-up delay-250">
          <h2 className="text-2xl font-bold text-orange-500 mb-3">
            4. तृतीय पक्ष धोरण
          </h2>
          <p className="text-gray-700 leading-relaxed">
            आम्ही वापरकर्त्यांची वैयक्तिक माहिती
            कोणत्याही तृतीय पक्षास विकत नाही,
            भाड्याने देत नाही किंवा शेअर करत नाही.
            केवळ कायदेशीर गरज असल्यासच
            माहिती उघड केली जाऊ शकते.
          </p>
        </section>

        {/* Cookies */}
        <section className="bg-white rounded-xl shadow-md p-6 animate-slide-up delay-300">
          <h2 className="text-2xl font-bold text-orange-500 mb-3">
            5. कुकीज (Cookies)
          </h2>
          <p className="text-gray-700 leading-relaxed">
            वेबसाइटचा अनुभव सुधारण्यासाठी
            कुकीजचा वापर केला जाऊ शकतो.
            वापरकर्ता इच्छित असल्यास
            आपल्या ब्राउझर सेटिंगमधून
            कुकीज निष्क्रिय करू शकतो.
          </p>
        </section>

        {/* Policy Changes */}
        <section className="bg-white rounded-xl shadow-md p-6 animate-slide-up delay-350">
          <h2 className="text-2xl font-bold text-orange-500 mb-3">
            6. धोरणातील बदल
          </h2>
          <p className="text-gray-700 leading-relaxed">
            हे गोपनीयता धोरण वेळोवेळी अद्ययावत
            केले जाऊ शकते.
            कोणतेही महत्त्वाचे बदल
            या पृष्ठावर प्रसिद्ध केले जातील.
          </p>
        </section>

        {/* Closing */}
        <section className="text-center animate-fade-in delay-400">
          <p className="text-gray-700 text-lg italic">
            “तुमचा विश्वास आमच्यासाठी अमूल्य आहे –
            आणि तो जपणे हे आमचे कर्तव्य आहे.”
          </p>
        </section>

      </div>
    </div>
  );
}
