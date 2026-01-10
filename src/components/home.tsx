
import SantCard from "../components/santcard";

export default function Home({ setActiveMenu }: { setActiveMenu: React.Dispatch<React.SetStateAction<string>> }) {

  const sants = [
    {
      name: "तुकाराम",
      description: "अभंगांच्या माध्यमातून भक्ती व प्रेमाचे संदेश देणारे पूजनीय मराठी संत.",
      image: "/images/santTukaram.jpg",
    },
    {
      name: "ज्ञानेश्वर",
      description: "भगवद्गीतेचे मराठीत सुलभ भाष्य करणाऱ्या ज्ञानेश्वरीचे महान लेखक.",
      image: "/images/santDyaneshwar.jpeg",
    },
    {
      name: "नामदेव",
      description: "ज्यांच्या रचनांचा समावेश गुरु ग्रंथ साहिबमध्येही आहे असे भक्तिसंत.",
      image: "/images/santNamdev.jpg",
    },
    {
      name: "एकनाथ",
      description: "एकात्मता, करुणा आणि मानवतेचे संदेश देणारे विद्वान संत.",
      image: "/images/santEknath.jpg",
    },
  ];

  return (
    <div className="p-6 text-center space-y-12 bg-[#def1de] min-h-screen">
      {/* स्वागत विभाग */}
      <div className="max-w-3xl mx-auto shadow-xl border-4 border-[#f97316] bg-white rounded-md">
        <div className="space-y-3 px-6 py-4 text-blue-800 text-base leading-relaxed">
          <p>
            विश्व संत साहित्य हा एक डिजिटल डॅशबोर्ड आहे ज्यामध्ये संत तुकाराम, संत
            ज्ञानेश्वर, संत नामदेव आणि संत एकनाथ यांसारख्या महान संतांची
            वाणी, ज्ञान आणि शिकवणी जपली व सादर केली जाते.
          </p>
          <p>
            महाराष्ट्राच्या संत परंपरेतील अभंग, शिक्षण आणि अध्यात्मिक
            विचारांचा अभ्यास करा.
          </p>
        </div>
      </div>

      {/* संत ग्रिड */}
      <section>
        <h2 className="text-center text-4xl font-bold text-[#f97316] font-serif mb-8 tracking-wider">
          महाराष्ट्रातील संत
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto px-4">
          {sants.map((sant) => (
            <SantCard key={sant.name} {...sant} setActiveMenu={setActiveMenu} />
          ))}
        </div>
      </section>
    </div>
  );
}