
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
import Navbar from "./navbar";



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

  interface GalleryPost {
    id: string;
    title: string;
    category?: string;
    image_url?: string;
    youtube_url?: string;
  }

  interface Post {
    id: string;
    title: string;
    category?: string;
    content?: string;
    image_url?: string;
    youtube_url?: string;
  }




  /* 🔍 Search */
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
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


  const handleSearch = async () => {

    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/list-all-posts`
      );
      const data = await res.json();
      setAllPosts(data.posts || []);
    } catch (err) {
      console.error(err);
      setAllPosts([]);
    } finally {
      setLoading(false);
    }
  };

  //for search bar

  useEffect(() => {
    if (categoryPosts && categoryPosts.length > 0) {
      setAllPosts(categoryPosts);
    }
    handleSearch();
  }, [categoryPosts]);

  //--------------------------

  const filteredPosts =
    search.trim() === ""
      ? []
      : allPosts.filter((post) =>
        `${post.title} ${post.category ?? ""}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );


  return (
    <>
      {/* MAIN CONTENT */}
      <div className="px-4 sm:px-6 lg:px-10 py-6 text-center space-y-12 bg-[#def1de] min-h-screen">
        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center px-4 py-6  border-b border-[#f97316]">

          {/* Quote */}
          <div className="text-center text-[#9a3412] font-serif text-lg sm:text-xl leading-relaxed mb-5">
            <p>|| विश्व स्नेह का ध्यान धरे | सबका सब सम्मान करे ||</p>
            <p>|| तेथ शब्दब्रह्म कवळले ||</p>
          </div>

          {/* Logo + Title (Side by Side) */}
          <div className="flex items-center gap-4">

            <Image
              src="/images/logo1.png"
              alt="विश्व संत साहित्य लोगो"
              width={110}
              height={110}
              className="object-contain"
              priority
            />

            <h1 className="text-[42px] sm:text-[56px] font-extrabold text-[#f97316] font-serif tracking-wider leading-tight">
              विश्व संत साहित्य
            </h1>

          </div>

        </div>
        {/* 🏷️ Category List (Simple Horizontal Style) */}
        <div
          className="
    mt-6
    flex
    justify-center
    [&_div]:flex
    [&_div]:flex-wrap
    [&_div]:gap-6
    [&_button]:bg-transparent
    [&_button]:px-0
    [&_button]:py-1
    [&_button]:text-sm
    [&_button]:font-medium
    [&_button]:text-gray-600
    hover:[&_button]:text-black-500
  "
        >
          <CategoryList onSelectCategory={handleCategorySelect} />
        </div>


        {/* 🔽 NAVBAR BELOW TITLE - FULL WIDTH */}
        <div className="w-full">
          <Navbar />
        </div>


        <section>
          {/* <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#f97316] font-serif mb-6 sm:mb-8 tracking-wider">
            महाराष्ट्रातील संत
          </h2> */}



          <div className="flex flex-col lg:flex-row gap-2 mt-8">
            <div className="lg:w-1/3 w-full">
              <MovingNewsList />
            </div>
            <div className="lg:w-2/3 w-full">
              <NewSantGrid />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto px-4">
            {filteredSants.map((sant) => (
              <SantCard
                key={sant.name}
                {...sant}
                setActiveMenu={setActiveMenu}
              />
            ))}
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="संतांचे नाव शोधा (उदा. तुकाराम)"
                className="w-full pl-12 pr-5 py-3 rounded-full bg-white border-2 border-orange-400 shadow-md focus:outline-none focus:border-orange-600"
              />
            </div>
          </div>

          {/* 🪟 POPUP MODAL */}
          {selectedPost && (

            console.log(selectedPost.image_url),

            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
              <div className="bg-white max-w-md w-full rounded-xl shadow-lg relative p-6">

                {/* ❌ Close Button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
                >
                  ✕
                </button>

                {/* 📄 Post Content */}
                <h2 className="text-xl font-bold text-orange-700 mb-2">
                  {selectedPost.title}
                </h2>

                {selectedPost.category && (
                  <p className="text-sm text-gray-500 mb-4">
                    {selectedPost.category}
                  </p>
                )}

                {selectedPost.image_url && (
                  <img
                    src={
                      selectedPost.image_url.startsWith("http")
                        ? selectedPost.image_url
                        : `http://localhost:5000${selectedPost.image_url}`

                    }
                    alt={selectedPost.title}
                    className="w-full h-52 object-cover rounded-lg mb-4"
                  />

                )}

                {selectedPost.youtube_url && (
                  <iframe
                    src={selectedPost.youtube_url}
                    className="w-full aspect-video rounded-lg"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          )}



          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="min-w-[260px] bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-orange-700">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500">
                {post.category}
              </p>
            </div>
          ))}



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
          <SantHorizontalGrid cardLayout="column" />

        </div>
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-2">
          <div className="w-full lg:w-3/4">
            <SantHorizontalGrid cardLayout="row" />
          </div>
          <QuarterColumn />

        </div>
        <div>
          <div className="text-xl font-semibold ">संस्था / केंद्र </div>
          <OrgGrid />
        </div>
        {/* <div>
        <Footer />
      </div> */}
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