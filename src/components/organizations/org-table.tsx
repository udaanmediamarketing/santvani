"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useAuth } from "../../pages/context/AuthContext";
import { useAuthFetch } from "../../pages/context/authFetch";

interface Organization {
  id: string;
  org_type: string | null;
  org_name: string;
  head_name: string;
  created_at: string;
}

export default function OrganizationsTable() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const authFetch = useAuthFetch();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchOrganizations = async () => {
      try {
        const res = await authFetch(
          `http://localhost:5000/api/organizations/list-orgs/${userId}`
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
  }, [userId]);

  return (
    <div className="mx-6">
      {loading && (
        <p className="text-center py-8">Loading organizations...</p>
      )}
      {!loading && organizations.length === 0 && (
        <p className="text-center py-8 text-gray-500">
          कोणतीही संस्था सापडली नाही
        </p>
      )}

      {!loading && organizations.length > 0 && (
        <Card className="p-4 mt-4">
          <h2 className="text-lg font-semibold mb-4 text-orange-400">
            माझ्या संस्था
          </h2>

          <div className="overflow-x-auto rounded-md border bg-orange-50">
            <Table className="min-w-full border-collapse">
              <TableHeader>
                <TableRow className="divide-x divide-gray-400 text-md">
                  <TableHead>संस्था प्रकार</TableHead>
                  <TableHead>संस्थेचे नाव</TableHead>
                  <TableHead>संस्थेचे प्रमुख</TableHead>
                  <TableHead>निर्मिती दिनांक</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {organizations.map((org) => (
                  <TableRow key={org.id} className="divide-x divide-gray-400">
                    <TableCell>{org.org_type || "—"}</TableCell>
                    <TableCell>{org.org_name}</TableCell>
                    <TableCell>{org.head_name}</TableCell>
                    <TableCell>
                      {new Date(org.created_at).toLocaleDateString("mr-IN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}