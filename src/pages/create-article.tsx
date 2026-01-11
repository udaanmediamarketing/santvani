import { useEffect } from "react";
import { useRouter } from "next/router";
import CreateArticleForm from "../components/articles/article-form";
import { useAuth } from "../pages/context/AuthContext";
import dynamic from "next/dynamic";

const SantNavbar = dynamic(
  () => import("../components/sant-navbar"),
  { ssr: false }
);

export default function CreateArticlePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth is done loading and no user, redirect to login
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [user, loading, router]);

  // Optional: prevent UI flash while redirecting
  if (loading || !user) {
    return null; // or a spinner
  }
  return (
    <>
      <SantNavbar activeMenu="Blogs" onMenuClick={() => {}}/>
      <CreateArticleForm />
    </>
  );
}