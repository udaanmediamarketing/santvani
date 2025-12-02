// import SantCard from "../components/santcard";
// // import Header from "../components/header";

// export default function Home() {
//   const [activeMenu, setActiveMenu] = useState("home");
//   const sants = [
//     {
//       name: "Tukaram",
//       description: "A revered Marathi saint and poet known for his abhangas of devotion and love.",
//       image: "/images/tukaram.jpg",
//     },
//     {
//       name: "Dnyaneshwar",
//       description: "Author of the Dnyaneshwari, a masterpiece explaining the Bhagavad Gita in Marathi.",
//       image: "/images/dnyaneshwar.jpg",
//     },
//     {
//       name: "Namdev",
//       description: "A devotional poet-saint whose compositions appear in the Guru Granth Sahib.",
//       image: "/images/namdev.jpg",
//     },
//     {
//       name: "Eknath",
//       description: "A scholar-saint known for his teachings of unity and compassion.",
//       image: "/images/eknath.jpg",
//     },
//   ];

//   return (
//     <div className="p-6 text-center space-y-12 bg-[#def1de] min-h-screen">
//       {/* Welcome Section */}
//       <div className="max-w-3xl mx-auto shadow-xl border-4 border-[#f97316] bg-white rounded-md">
//   <div className="space-y-3 px-6 py-4 text-blue-800 text-base leading-relaxed">
//     <p>
//       SantVani is a digital dashboard dedicated to preserving and
//       celebrating the wisdom of revered saints like Sant Tukaram, Sant
//       Dnyaneshwar, Sant Namdev, and Sant Eknath.
//     </p>
//     <p>
//       Explore teachings, abhangas, and spiritual insights from Maharashtra’s
//       great Sant parampara.
//     </p>
//   </div>
// </div>

//       {/* Saints Grid */}
//       <section>
//         <h2 className="text-center text-4xl font-bold text-[#f97316] font-serif mb-8 tracking-wider">
//           Saints of Maharashtra
//         </h2>

//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto px-4">
//           {sants.map((sant) => (
//             <SantCard key={sant.name} {...sant} setActiveMenu={setActiveMenu}  />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }


import SantCard from "../components/santcard";

export default function Home({ setActiveMenu }: { setActiveMenu: React.Dispatch<React.SetStateAction<string>> }) {

  const sants = [
    {
      name: "Tukaram",
      description: "A revered Marathi saint and poet known for his abhangas of devotion and love.",
      image: "/images/tukaram.jpg",
    },
    {
      name: "Dnyaneshwar",
      description: "Author of the Dnyaneshwari, a masterpiece explaining the Bhagavad Gita in Marathi.",
      image: "/images/dnyaneshwar.jpg",
    },
    {
      name: "Namdev",
      description: "A devotional poet-saint whose compositions appear in the Guru Granth Sahib.",
      image: "/images/namdev.jpg",
    },
    {
      name: "Eknath",
      description: "A scholar-saint known for his teachings of unity and compassion.",
      image: "/images/eknath.jpg",
    },
  ];

  return (
    <div className="p-6 text-center space-y-12 bg-[#def1de] min-h-screen">
      {/* Welcome Section */}
      <div className="max-w-3xl mx-auto shadow-xl border-4 border-[#f97316] bg-white rounded-md">
        <div className="space-y-3 px-6 py-4 text-blue-800 text-base leading-relaxed">
          <p>
            SantVani is a digital dashboard dedicated to preserving and
            celebrating the wisdom of revered saints like Sant Tukaram, Sant
            Dnyaneshwar, Sant Namdev, and Sant Eknath.
          </p>
          <p>
            Explore teachings, abhangas, and spiritual insights from Maharashtra’s
            great Sant parampara.
          </p>
        </div>
      </div>

      {/* Saints Grid */}
      <section>
        <h2 className="text-center text-4xl font-bold text-[#f97316] font-serif mb-8 tracking-wider">
          Saints of Maharashtra
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