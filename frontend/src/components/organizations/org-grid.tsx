"use client";

import { useEffect, useState } from "react";
import OrgCard from "./org-card";
import { Button } from "../ui/button";
import {useRouter} from "next/navigation";
import {Organization} from "../../types/org";


export default function OrgGrid({
  orgs = [],
}: {
  orgs: Organization[];
}) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
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
      <p className="text-center py-10 text-gray-500">
        संस्था लोड होत आहेत...
      </p>
    );
  }

  if (organizations.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        कोणतीही संस्था उपलब्ध नाही
      </p>
    );
  }

  const visibleOrgs = organizations.slice(0, visibleCount);

  return (
    <div className="px-6 py-6">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleOrgs.map((org) => (
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

      {/* Load More */}
      {visibleCount < organizations.length && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => router.replace("/list-all-orgs")}
            className="bg-[#f97316] hover:bg-[#f97316]/90"
          >
            अधिक पहा
          </Button>
        </div>
      )}
    </div>
  );
}