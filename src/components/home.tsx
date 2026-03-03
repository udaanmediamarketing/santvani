'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import SantCard from '../components/santcard';
import MovingNewsList from './vertical-list';
import NewSantGrid from './cards/santcard-grid';
import WorldFreshUpdatesKirtan from './world-fresh-updates-kirtan';
import EditorUpdatesSection from './editor-layout-posts';
import ReadMoreSection from './read-more-posts';
import QuarterColumn from './quater-column';
import OrgGrid from './organizations/org-grid';
import Footer from './footer';
import { Organization } from '../types/org';
import { Post } from '../types/post';
import { useAuthFetch } from '../context/authFetch';

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
          'http://localhost:5000/api/dashboard/home'
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

  if (loading) {
    return <div className="p-10 text-center">Loading dashboard…</div>;
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-10 py-6 text-center space-y-12 bg-[#def1de] min-h-screen">

        {/* 🔶 Welcome */}
        <div className="max-w-3xl mx-auto shadow-xl border-4 border-[#f97316] bg-white rounded-md overflow-hidden">
          <div className="flex items-center justify-center gap-3 px-4 py-4 bg-orange-50 border-b border-[#f97316]">
            <Image
              src="/images/logo.jpg"
              alt="विश्व संत साहित्य लोगो"
              width={56}
              height={56}
              priority
            />
            <h1 className="text-[28px] sm:text-[38px] font-extrabold text-[#f97316] font-serif">
              विश्व संत साहित्य
            </h1>
          </div>
        </div>

        {/* 🔶 Saints */}
        <section>

          {/* <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {sants.map((sant) => (
              <SantCard
                key={sant.name}
                {...sant}
                setActiveMenu={setActiveMenu}
              />
            ))}
          </div> */}

          <div className="flex flex-col lg:flex-row gap-2 mt-8">
            <div className="lg:w-1/3 w-full">
              <MovingNewsList posts={movingNews} />
            </div>
            <div className="lg:w-2/3 w-full">
              <NewSantGrid posts={posts} />
            </div>
          </div>
        </section>

        <WorldFreshUpdatesKirtan
          title="World Fresh Updates"
          posts={kirtanPosts}
        />

        <EditorUpdatesSection posts={editorPosts} />

        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-2">
          <div className="w-full lg:w-3/4">
            <ReadMoreSection posts={posts} />
          </div>
          <QuarterColumn posts={posts} />
        </div>

        <div>
          <div className="text-xl font-semibold">संस्था / केंद्र</div>
          <OrgGrid orgs={organizations} />
        </div>

        <Footer />
      </div>
    </>
  );
}