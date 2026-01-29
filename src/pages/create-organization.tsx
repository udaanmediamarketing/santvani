import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import dynamic from "next/dynamic";
import CreateOrganizationForm from "../components/organizations/org-form";
import Navbar from "../components/navbar";
export default function CreateOrganizationPage() {
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
      {/* <antNavbar activeMenu="Blogs" onMenuClick={() => {}}/> */}
      <Navbar />
      <CreateOrganizationForm />
    </>
  );
}