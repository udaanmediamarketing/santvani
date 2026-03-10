"use client";

import { useEffect, useState } from "react";
import OrgCard from "./org-card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Navbar from "../navbar";

interface Organization {
  id: string;
  org_name: string;
  org_type?: string | null;
  head_name: string;
  city: string;
  state: string;
  created_at: string;
  image_url?: string | null;
  youtube_url?: string | null;
}

export default function OrgAllGrid() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/organizations/list-all-orgs"
        );
        const data = await res.json();

        const orgArray = Array.isArray(data)
          ? data
          : Array.isArray(data.posts)
          ? data.posts
          : [];

        setOrganizations(orgArray);
      } catch (err) {
        console.error("Failed to fetch organizations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return (
      <>
       <Navbar />
      <p className="text-center py-10 text-gray-500">
        संस्था लोड होत आहेत...
      </p>
      </>
    );
  }

  if (organizations.length === 0) {
    return (
      <>
      <Navbar />
      <p className="text-center py-10 text-gray-500">
        कोणतीही संस्था उपलब्ध नाही
      </p>
      </>
    );
  }

  return (
    <>
    <Navbar />  
    <div className="px-6 py-6">
      {/* Column Layout */}
      <div className="flex flex-col space-y-6 w-3/4">
        {organizations.map((org) => (
          <OrgCard
            key={org.id}
            orgName={org.org_name}
            orgType={org.org_type}
            headName={org.head_name}
            city={org.city}
            state={org.state}
            createdAt={org.created_at}
            imageUrl={org.image_url}
            youtubeUrl={org.youtube_url}
          />
        ))}
      </div>
    </div>
    </>
  );
}
