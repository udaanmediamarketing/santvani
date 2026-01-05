"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useAuth } from "../context/AuthContext";

type User = {
  name?: string;
  email?: string;
  image?: string;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [preview, setPreview] = useState<string | null>(user?.image || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleSave = () => {
    console.log("Updated profile:", user);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-8">माझी प्रोफाइल</h1>

      <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-8">
        
        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-orange-600 text-white flex items-center justify-center text-3xl font-semibold overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="प्रोफाइल फोटो"
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.name?.[0]
              )}
            </div>

            <label
              htmlFor="image"
              className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100 transition"
            >
              <Camera size={16} />
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div>
            <p className="font-medium">प्रोफाइल फोटो</p>
            <p className="text-sm text-gray-500">
              JPG, PNG किंवा WebP. कमाल 5MB.
            </p>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">नाव</Label>
          <Input
            id="name"
            value={user?.name}
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Email (Read Only) */}
        <div className="space-y-2">
          <Label htmlFor="email">ई-मेल</Label>
          <Input
            id="email"
            value={user?.email}
            disabled
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="px-6">
            बदल जतन करा
          </Button>
        </div>
      </div>
    </div>
  );
}
