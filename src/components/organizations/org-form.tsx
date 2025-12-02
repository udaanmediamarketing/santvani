"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

// ✅ Validation schema
const orgSchema = z.object({
  name: z.string().min(2, "Organization name is required"),
  santName: z.string().min(1, "Please select a Sant"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  foundedYear: z.string().optional(),
});

type OrgFormData = z.infer<typeof orgSchema>;

export default function OrganizationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrgFormData>({
    resolver: zodResolver(orgSchema),
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: OrgFormData) => {
    try {
      setMessage("");
      const res = await fetch("/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to add organization");
      setMessage("✅ Organization added successfully!");
      reset();
    } catch (err) {
      setMessage("❌ Failed to save organization");
    }
  };

  const sants = ["Tukaram", "Eknath", "Namdev", "Dnyaneshwar"];

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md shadow-orange-200 rounded-xl space-y-4 mt-5">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Add Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Organization Name */}
            <div>
              <label className="block font-medium mb-1">Organization Name</label>
              <Input placeholder="Eg. Sant Tukaram Samaj Mandal" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Sant Dropdown */}
            <div>
              <label className="block font-medium mb-1">Associated Sant</label>
              <Select onValueChange={(val) => setValue("santName", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sant" />
                </SelectTrigger>
                <SelectContent>
                  {sants.map((sant) => (
                    <SelectItem key={sant} value={sant}>
                      {sant}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.santName && <p className="text-red-500 text-sm mt-1">{errors.santName.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">Description</label>
              <Textarea rows={4} placeholder="Brief info about the organization" {...register("description")} />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Website */}
            <div>
              <label className="block font-medium mb-1">Website / Social Link (optional)</label>
              <Input placeholder="https://example.com" {...register("website")} />
              {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
            </div>

            {/* Founded Year */}
            <div>
              <label className="block font-medium mb-1">Founded Year (optional)</label>
              <Input type="number" placeholder="e.g. 1980" {...register("foundedYear")} />
            </div>

            <Button type="submit" disabled={isSubmitting}
            className="w-40 font-sans bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg"
            >
              {isSubmitting ? "Saving..." : "Submit Organization"}
            </Button>
            {message && <p className="mt-2 text-sm text-center">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}