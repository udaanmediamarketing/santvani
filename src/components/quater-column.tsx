import {
  Mail,
  Facebook,
  Instagram,
  MessageCircle,
  Twitter,
  Linkedin,
} from "lucide-react";
import SantHorizontalGrid from "./cards/horizontal-vertical-cards";
export default function QuarterColumn() {
  return (
    <div className="w-full md:w-1/4 flex flex-col gap-4">
      <section className="text-center">
  <h2 className="text-2xl font-bold text-orange-600 mb-6">
    आम्हाला सोशल मीडियावर फॉलो करा
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
    
    <a
      href="https://www.facebook.com"
      target="_blank"
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-blue-600 text-white hover:opacity-90 transition"
    >
      <Facebook size={18} />
      Facebook
    </a>

    <a
      href="https://www.instagram.com"
      target="_blank"
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-pink-500 text-white hover:opacity-90 transition"
    >
      <Instagram size={18} />
      Instagram
    </a>

    <a
      href="https://wa.me/911234567890"
      target="_blank"
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-green-500 text-white hover:opacity-90 transition"
    >
      <MessageCircle size={18} />
      WhatsApp
    </a>

    <a
      href="https://twitter.com"
      target="_blank"
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-sky-500 text-white hover:opacity-90 transition"
    >
      <Twitter size={18} />
      Twitter
    </a>

    <a
      href="https://www.linkedin.com"
      target="_blank"
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-blue-800 text-white hover:opacity-90 transition"
    >
      <Linkedin size={18} />
      LinkedIn
    </a>

    <a
      href="mailto:vishwsantsahitya@gmail.com"
      className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gray-700 text-white hover:opacity-90 transition"
    >
      <Mail size={18} />
      Email
    </a>

  </div>

  <SantHorizontalGrid cardLayout="row" variant="side"/>
</section>

    </div>
  );
}