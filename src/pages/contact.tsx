import React from "react";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  MessageCircle,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Heading */}
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-3">
            संपर्क साधा
          </h1>
          <p className="text-gray-600 text-lg">
            आम्हाला तुमचा अभिप्राय महत्त्वाचा आहे
          </p>
        </section>

        {/* Divider */}
        <div className="h-1 w-24 bg-orange-400 mx-auto rounded-full" />

        {/* Intro Text */}
        <section className="text-center">
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            <strong>विश्व संत साहित्य</strong> या उपक्रमासंदर्भात
            आपल्याला काही प्रश्न, सूचना किंवा सहकार्य करायचे असल्यास
            खालील माध्यमांद्वारे आमच्याशी सहज संपर्क साधू शकता.
          </p>
        </section>

        {/* Contact Info Cards */}
        <section className="grid md:grid-cols-2 gap-8">

          {/* Email Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="text-orange-500" />
              <h2 className="text-xl font-bold text-orange-500">
                ई-मेल
              </h2>
            </div>
            <p className="text-gray-700 mb-2">
              कोणत्याही चौकशीसाठी आम्हाला ई-मेल करा
            </p>
            <a
              href="mailto:vishwsantsahitya@gmail.com"
              className="text-orange-600 font-medium hover:underline"
            >
              vishwsantsahitya@gmail.com
            </a>
          </div>

          {/* Phone / WhatsApp Card */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="text-orange-600" />
              <h2 className="text-xl font-bold text-orange-500">
                फोन / WhatsApp
              </h2>
            </div>
            <p className="text-gray-700 mb-2">
              थेट संवादासाठी WhatsApp वर संपर्क करा
            </p>
            <a
              href="https://wa.me/911234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold hover:underline"
            >
              +91 12345 67890
            </a>
          </div>
        </section>

        {/* Social Media */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">
            आम्हाला सोशल मीडियावर फॉलो करा
          </h2>

          <div className="flex flex-wrap justify-center gap-6">

            <a
              href="https://www.facebook.com"
              target="_blank"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white hover:opacity-90 transition"
            >
              <Facebook size={18} />
              Facebook
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-pink-500 text-white hover:opacity-90 transition"
            >
              <Instagram size={18} />
              Instagram
            </a>

            <a
              href="https://wa.me/911234567890"
              target="_blank"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-green-500 text-white hover:opacity-90 transition"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-sky-500 text-white hover:opacity-90 transition"
            >
              <Twitter size={18} />
              Twitter
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-blue-800 text-white hover:opacity-90 transition"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>

            <a
              href="mailto:vishwsantsahitya@gmail.com"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-700 text-white hover:opacity-90 transition"
            >
              <Mail size={18} />
              Email
            </a>

          </div>
        </section>

        {/* Closing Note */}
        <section className="text-center">
          <p className="text-gray-700 italic text-lg">
            “संवादातूनच समज वाढते – आम्ही तुमच्या प्रतिसादाची वाट पाहत आहोत.”
          </p>
        </section>

      </div>
    </div>
  );
}
