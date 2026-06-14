
'use client';

import Image from 'next/image';

import SantCard from '../components/santcard';
import MovingNewsList from './vertical-list';
import NewSantGrid from './cards/santcard-grid';
import WorldFreshUpdatesKirtan from './world-fresh-updates-kirtan';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import QuarterColumn from './quater-column';
import OrgGrid from './organizations/org-grid';
import Footer from './footer';
import { Organization } from '../types/org';
import { useAuthFetch } from '../context/authFetch';
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CategoryList from "./category-list";
import Navbar from "./navbar";
import SantHorizontalGrid from './cards/horizontal-vertical-cards';
import EditorUpdatesSection from './editor-layout-posts';



export default function Home({
  setActiveMenu,
}: {
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  /** 🔹 DASHBOARD STATE */
  const authFetch = useAuthFetch();

  const [posts, setPosts] = useState<Post[]>([]);
  const [kirtanPosts, setKirtanPosts] = useState<Post[]>([]);
  const [editorPosts, setEditorPosts] = useState<Post[]>([]);
  const [movingNews, setMovingNews] = useState<Post[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  /** 🔹 FETCH DASHBOARD (ONE API CALL) */
  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await authFetch(
          `${apiUrl}/api/dashboard/home`
        );
        const data = await res.json();

        setPosts(data.posts ?? []);
        setKirtanPosts(data.kirtanPosts ?? []);
        setEditorPosts(data.editorPosts ?? []);
        setMovingNews(data.movingNews ?? []);
        setOrganizations(data.organizations ?? []);
      } catch (err) {
        console.error('Dashboard fetch failed', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  // Combine all posts for searchable content
  const allSearchablePosts = [
    ...posts,
    ...kirtanPosts,
    ...editorPosts,
    ...movingNews,
  ].reduce((unique: Post[], post) => {
    // Remove duplicates by id
    if (!unique.find(p => p.id === post.id)) {
      unique.push(post);
    }
    return unique;
  }, []);

  const sants = [
    {
      name: 'तुकाराम',
      description:
        'अभंगांच्या माध्यमातून भक्ती व प्रेमाचे संदेश देणारे पूजनीय मराठी संत.',
      image: '/images/santTukaram.jpg',
    },
    {
      name: 'ज्ञानेश्वर',
      description:
        'भगवद्गीतेचे मराठीत सुलभ भाष्य करणाऱ्या ज्ञानेश्वरीचे महान लेखक.',
      image: '/images/santDyaneshwar.jpeg',
    },
    {
      name: 'नामदेव',
      description:
        'ज्यांच्या रचनांचा समावेश गुरु ग्रंथ साहिबमध्येही आहे असे भक्तिसंत.',
      image: '/images/santNamdev.jpg',
    },
    {
      name: 'एकनाथ',
      description:
        'एकात्मता, करुणा आणि मानवतेचे संदेश देणारे विद्वान संत.',
      image: '/images/santEknath.jpg',
    },
  ];


  /* 🔍 Search */
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const filteredSants = sants.filter((sant) =>
    sant.name.toLowerCase().includes(search.toLowerCase())
  );

  /* 🏷️ Category */
  const [selectedCategory, setSelectedCategory] =
    React.useState<string | null>(null);
  const [categoryPosts, setCategoryPosts] = React.useState<Post[]>([]);
  //const [loading, setLoading] = React.useState(false);



  //for search bar

  useEffect(() => {
    if (categoryPosts && categoryPosts.length > 0) {
      setAllPosts(categoryPosts);
    }
    handleSearch();
  }, [categoryPosts]);

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

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    setLoading(true);

    try {
      const res = await fetch(
        `${apiUrl}/api/posts/list-by-category/${encodeURIComponent(
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

        `${apiUrl}/api/posts/list-all-posts`
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



  //--------------------------

  const filteredPosts =
    search.trim() === ""
      ? []
      : allPosts.filter((post) =>
        `${post.title} ${post.category ?? ""}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );

  if (loading) {
    return <div className="p-10 text-center">Loading dashboard…</div>;
  }



  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] overflow-x-hidden">
  {/* MAIN CONTENT WRAPPER */}
  <main className="flex-grow px-4 sm:px-6 lg:px-10 py-6 text-center">
    
    {/* Welcome Section */}
    <section className="flex flex-col items-center justify-center px-4 py-8 border-b border-[#f97316] mb-12">
      {/* Quote */}
      <div className="text-center text-[#9a3412] font-serif text-lg sm:text-xl leading-relaxed mb-6">
        <p>|| विश्व स्नेह का ध्यान धरे | सबका सब सम्मान करे ||</p>
        <p>|| तेथ शब्दब्रह्म कवळले ||</p>
      </div>

          {/* Logo + Title */}
          <div className="flex items-center gap-3">
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
        </section>


    {/* Navbar - Full Width Hack */}
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mb-0">
      <Navbar posts={allSearchablePosts}/>
    </div>

        {/* Content Sections */}
        <div className="space-y-12">
          <section>
            <div className="flex flex-col lg:flex-row gap-2 w-full">

              {/* Left Side - Moving News */}
              <div className="lg:w-[35%] w-full flex-shrink-0 ml-0 pl-0">
                <MovingNewsList posts={movingNews} />
              </div>

              {/* Right Side - Sant Grid */}
              <div className="lg:flex-1 w-full">
                <NewSantGrid posts={posts} />
              </div>

            </div>
          </section>

          <div>
            {/* <SantHorizontalGrid cardLayout="column" /> */}
            <WorldFreshUpdatesKirtan
              title="World Fresh Updates"
              posts={kirtanPosts}
            />

          </div>
          <div className="flex flex-col lg:flex-row max-w-10xl mx-auto px-2">
            <div className="w-full lg:w-3/4 flex flex-col gap-2">
              <div className="border border-gray-300 rounded">
                <EditorUpdatesSection posts={editorPosts} />
              </div>
              <div className="border border-gray-300 rounded p-3">
                <SantHorizontalGrid cardLayout="row" bgWhite={true} imageFit='contain' desc={true} imageWidth="w-60" imageHeight="h-40" />
              </div>
            </div>

            {/* <div className="w-full lg:w-3/4">
              <EditorUpdatesSection posts={editorPosts} />
              <SantHorizontalGrid cardLayout="row" bgWhite={true} imageFit='contain' desc={true} imageWidth="w-60" imageHeight="h-40" />
            </div> */}
            <div className='w-full lg:w-1/4'>
              <QuarterColumn posts={posts} />
            </div>
          </div>

          <div className="pb-12">
            <div className="text-xl font-semibold mb-4">संस्था / केंद्र</div>
            <OrgGrid orgs={organizations} />
          </div>
        </div>
      </main>

  {/* 🏁 FOOTER - No margin-top allowed here */}
  <footer className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
    <Footer posts={allSearchablePosts}/>
  </footer>
</div>
  );
}