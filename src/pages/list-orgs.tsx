import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

import dynamic from "next/dynamic";

const OrganizationsTable = dynamic(
  () => import("../components/organizations/org-table"),
  { ssr: false }
);

export default function MyOrganizationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [user, loading, router]);

  return (
    <main className="container mx-auto py-6">
      {loading ? null : user ? <OrganizationsTable /> : null}
    </main>
  );
}