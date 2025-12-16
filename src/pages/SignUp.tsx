"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "../components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Registration successful! Waiting for admin approval.");
        setTimeout(() => router.replace("/signin"), 2500);
      } else {
        setMessage(`❌ ${data.error || "Signup failed"}`);
      }
    } catch {
      setMessage("⚠️ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-500">
      <motion.div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account ✨</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
          <input name="email" value={formData.email} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
          <input name="password" type="password" value={formData.password} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />

          <Button type="submit" disabled={loading} className="w-full bg-orange-500 text-white">
            <UserPlus size={18} /> {loading ? "Creating..." : "Sign Up"}
          </Button>
        </form>

        {message && <p className="text-center mt-4">{message}</p>}

        <p className="text-center mt-6">
          Already have an account? <Link href="/signin" className="text-orange-600">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;