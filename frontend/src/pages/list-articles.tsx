import ArticlesTable from "../components/articles/articles-table";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
export default function MyArticlesPage() {
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
      return null;
    }
  return (
    <main className="container mx-auto py-6">
      <ArticlesTable />
    </main>
  );
}