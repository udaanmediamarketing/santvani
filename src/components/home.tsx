// import SantCard from "../components/santcard";
// import NewSantGrid from "./cards/santcard-grid";
// import MovingNewsList from "./vertical-list";
// import Footer from "./footer";
// import React from "react";
// import { Search } from "lucide-react";
// import CategoryList from "./category-list";

// export default function Home({
//   setActiveMenu,
// }: {
//   setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
// }) {
//   const sants = [
//     {
//       name: "तुकाराम",
//       description:
//         "अभंगांच्या माध्यमातून भक्ती व प्रेमाचे संदेश देणारे पूजनीय मराठी संत.",
//       image: "/images/santTukaram.jpg",
//     },
//     {
//       name: "ज्ञानेश्वर",
//       description:
//         "भगवद्गीतेचे मराठीत सुलभ भाष्य करणाऱ्या ज्ञानेश्वरीचे महान लेखक.",
//       image: "/images/santDyaneshwar.jpeg",
//     },
//     {
//       name: "नामदेव",
//       description:
//         "ज्यांच्या रचनांचा समावेश गुरु ग्रंथ साहिबमध्येही आहे असे भक्तिसंत.",
//       image: "/images/santNamdev.jpg",
//     },
//     {
//       name: "एकनाथ",
//       description:
//         "एकात्मता, करुणा आणि मानवतेचे संदेश देणारे विद्वान संत.",
//       image: "/images/santEknath.jpg",
//     },
//   ];

//   const [search, setSearch] = React.useState("");

//   const filteredSants = sants.filter((sant) =>
//     sant.name.toLowerCase().includes(search.toLowerCase())
//   );


//   return (
//     <>
//       {/* MAIN CONTENT */}
//       <div className="px-4 sm:px-6 lg:px-10 py-6 text-center space-y-12 bg-[#def1de] min-h-screen">

//         {/* Welcome Section */}
//         <div className="max-w-3xl mx-auto shadow-xl border-4 border-[#f97316] bg-white rounded-md overflow-hidden">
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-4 bg-orange-50 border-b border-[#f97316]">
//             <img
//               src="/images/logo.jpg"
//               alt="विश्व संत साहित्य लोगो"
//               className="h-14 w-auto object-contain"
//             />

//             <h1 className="text-[28px] sm:text-[38px] font-extrabold text-[#f97316] font-serif tracking-wide text-center leading-tight">
//               विश्व संत साहित्य
//             </h1>
//           </div>

//           <div className="space-y-3 px-4 sm:px-6 py-4 text-blue-800 text-sm sm:text-base leading-relaxed text-center">
//             <p>
//               विश्व संत साहित्य हा एक डिजिटल डॅशबोर्ड आहे ज्यामध्ये संत तुकाराम,
//               संत ज्ञानेश्वर, संत नामदेव आणि संत एकनाथ यांसारख्या महान संतांची
//               वाणी, ज्ञान आणि शिकवणी जपली व सादर केली जाते.
//             </p>
//             <p>
//               महाराष्ट्राच्या संत परंपरेतील अभंग, शिक्षण आणि अध्यात्मिक
//               विचारांचा अभ्यास करा.
//             </p>
//           </div>
//         </div>

//         {/* Saints Grid */}
//         <section>
//           <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#f97316] font-serif mb-6 sm:mb-8 tracking-wider">
//             महाराष्ट्रातील संत
//           </h2>

//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto px-4">
//             {sants.map((sant) => (
//               <SantCard
//                 key={sant.name}
//                 {...sant}
//                 setActiveMenu={setActiveMenu}
//               />
//             ))}
//           </div>

//           <div className="flex flex-col lg:flex-row gap-2 mt-8">
//             <div className="lg:w-1/3 w-full">
//               <MovingNewsList />
//             </div>

//             <div className="lg:w-2/3 w-full">
//               <NewSantGrid />
//             </div>
//           </div>



//           {/* 🔍 Search Bar (CENTER – Animated & Clean) */}
//           <div className="flex justify-center my-12 px-4">
//             <div className="relative w-full max-w-lg">
//               <Search
//                 size={20}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />

//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="संतांचे नाव शोधा (उदा. तुकाराम)"
//                 className="
//         w-full
//         pl-12 pr-5 py-3
//         rounded-full
//         bg-white
//         border-2 border-orange-400
//         text-gray-800
//         shadow-md
//         transition-all duration-300
//         focus:outline-none
//         focus:border-orange-600
//         focus:shadow-lg
//         focus:scale-[1.02]
//       "
//               />
//             </div>
//           </div>

//           {/* 🏷️ Category Tags */}
//           <CategoryList />

//         </section>
//       </div>

//       {/* FULL WIDTH FOOTER */}
//       <Footer />
//     </>
//   );
// }



import SantCard from "../components/santcard";
import SantHorizontalGrid from "./cards/horizontal-vertical-cards";
import NewSantGrid from "./cards/santcard-grid";
import MovingNewsList from "./vertical-list";

import Footer from "./footer";
import QuarterColumn from "./quater-column";
import OrgGrid from "./organizations/org-grid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CategoryList from "./category-list";

export default function Home({
  setActiveMenu,
}: {
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const sants = [
    {
      name: "तुकाराम",
      description:
        "अभंगांच्या माध्यमातून भक्ती व प्रेमाचे संदेश देणारे पूजनीय मराठी संत.",
      image: "/images/santTukaram.jpg",
    },
    {
      name: "ज्ञानेश्वर",
      description:
        "भगवद्गीतेचे मराठीत सुलभ भाष्य करणाऱ्या ज्ञानेश्वरीचे महान लेखक.",
      image: "/images/santDyaneshwar.jpeg",
    },
    {
      name: "नामदेव",
      description:
        "ज्यांच्या रचनांचा समावेश गुरु ग्रंथ साहिबमध्येही आहे असे भक्तिसंत.",
      image: "/images/santNamdev.jpg",
    },
    {
      name: "एकनाथ",
      description:
        "एकात्मता, करुणा आणि मानवतेचे संदेश देणारे विद्वान संत.",
      image: "/images/santEknath.jpg",
    },
  ];

  interface Post {
    id: string;
    title: string;
    slug: string;
    category: string;
    created_at: string;
  }


  /* 🔍 Search */
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const filteredSants = sants.filter((sant) =>
    sant.name.toLowerCase().includes(search.toLowerCase())
  );

  /* 🏷️ Category */
  const [selectedCategory, setSelectedCategory] =
    React.useState<string | null>(null);
  const [categoryPosts, setCategoryPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/list-by-category/${encodeURIComponent(
          category
        )}`
      );
      const data = await res.json();
      setCategoryPosts(data.posts || []);
    } catch (err) {
      console.error(err);
      setCategoryPosts([]);
    } finally {
      setLoading(false);
    }
  };

  //for search bar

  useEffect(() => {
    if (categoryPosts && categoryPosts.length > 0) {
      setAllPosts(categoryPosts);
    }
  }, [categoryPosts]);


  const handleSearch = (value: string) => {
    setSearch(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const q = value.toLowerCase();

    const filtered = allPosts.filter((post) =>
      post.title.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q)
    );
    setSearchResults(filtered);
  };


  return (
    <>
      {/* MAIN CONTENT */}
      <div className="px-4 sm:px-6 lg:px-10 py-6 text-center space-y-12 bg-[#def1de] min-h-screen">
        {/* Welcome Section */}
        <div className="max-w-3xl mx-auto shadow-xl border-4 border-[#f97316] bg-white rounded-md overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-4 py-4 bg-orange-50 border-b border-[#f97316]">
  <Image
    src="/images/logo.jpg"
    alt="विश्व संत साहित्य लोगो"
    width={56}
    height={56}
    className="object-contain"
    priority
  />

  <h1 className="text-[28px] sm:text-[38px] font-extrabold text-[#f97316] font-serif tracking-wide text-center leading-tight">
    विश्व संत साहित्य
  </h1>
</div>

          <div className="space-y-3 px-4 sm:px-6 py-4 text-blue-800 text-sm sm:text-base leading-relaxed text-center">
            <p>
              विश्व संत साहित्य हा एक डिजिटल डॅशबोर्ड आहे ज्यामध्ये संत तुकाराम,
              संत ज्ञानेश्वर, संत नामदेव आणि संत एकनाथ यांसारख्या महान संतांची
              वाणी, ज्ञान आणि शिकवणी जपली व सादर केली जाते.
            </p>
            <p>
              महाराष्ट्राच्या संत परंपरेतील अभंग, शिक्षण आणि अध्यात्मिक
              विचारांचा अभ्यास करा.
            </p>
          </div>
        </div>

        {/* Saints Grid */}
        <section>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#f97316] font-serif mb-6 sm:mb-8 tracking-wider">
            महाराष्ट्रातील संत
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto px-4">
            {filteredSants.map((sant) => (
              <SantCard
                key={sant.name}
                {...sant}
                setActiveMenu={setActiveMenu}
              />
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-2 mt-8">
            <div className="lg:w-1/3 w-full">
              <MovingNewsList />
            </div>
            <div className="lg:w-2/3 w-full">
              <NewSantGrid />
            </div>
          </div>

          {/* 🔍 Search Bar */}
          <div className="flex justify-center my-12 px-4">
            <div className="relative w-full max-w-lg">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="संतांचे नाव शोधा (उदा. तुकाराम)"
                className="w-full pl-12 pr-5 py-3 rounded-full bg-white border-2 border-orange-400 shadow-md focus:outline-none focus:border-orange-600"
              />

            </div>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <div className="flex gap-4 w-max px-4">
                {searchResults.map((post) => (
                  <div
                    key={post.id}
                    className="min-w-[260px] bg-white p-4 rounded-lg shadow"
                  >
                    <h3 className="font-semibold text-orange-700">{post.title}</h3>
                    <p className="text-sm text-gray-500">{post.category}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchResults.length === 0 && search && (
            <p className="text-center text-gray-500 mt-4">
              कोणतेही परिणाम सापडले नाहीत
            </p>
          )}


          {/* 🏷️ Category Tags */}
          <CategoryList onSelectCategory={handleCategorySelect} />

          {/* 📄 Category Result */}
          {selectedCategory && (
            <div className="max-w-6xl mx-auto mt-10 px-4">
              ...
            </div>
          )}

        </section>
  
      <div>
        <SantHorizontalGrid cardLayout="column"/>

      </div>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-2">
  <div className="w-full lg:w-3/4">
    <SantHorizontalGrid cardLayout="row"/>
  </div>
    <QuarterColumn />

</div>
<div>
  <div className="text-xl font-semibold ">संस्था / केंद्र </div>
  <OrgGrid/>
</div>
      <div>
        <Footer />
      </div>
    </div>

      <Footer />
    </>
  );
  
}

{/* <div className="flex flex-wrap gap-6">
  <QuarterColumn>
    <h2 className="text-lg font-bold">Title</h2>
    <p>Description text</p>
    <button className="btn">Action</button>
  </QuarterColumn>

  <div className="w-full md:w-3/4">
    Main content
  </div>
</div> */}