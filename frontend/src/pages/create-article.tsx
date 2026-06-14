import { useEffect } from "react";
import { useRouter } from "next/router";
import CreateArticleForm from "../components/articles/article-form";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";
import { useAllSearchPosts } from "../hooks/useAllSearchPosts";

export default function CreateArticlePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { posts } = useAllSearchPosts();

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
      <Navbar posts={posts} />
      <CreateArticleForm />
    </>
  );
}