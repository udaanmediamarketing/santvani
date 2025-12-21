// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { Button } from "../components/ui/button";
// import { LogIn } from "lucide-react";
// import { useState } from "react";

// const SignIn = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email.trim(),
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         if (response.status === 401) setMessage("❌ Invalid credentials.");
//         else if (response.status === 403) setMessage("⚠️ Your account is pending admin approval.");
//         else if (response.status === 404) setMessage("❌ User not found.");
//         else setMessage(`❌ ${data.error || "Something went wrong"}`);
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       const redirectPath = data.user.role === "admin" ? "/adminDashboard" : "/dashboard";
//       router.replace(redirectPath);

//     } catch (err) {
//       console.error(err);
//       setMessage("⚠️ Server not responding.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 to-orange-600 p-4">
//       <motion.div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
//           Welcome Back 👋
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />

//           <Button type="submit" disabled={loading} className="w-full bg-orange-500 text-white">
//             <LogIn size={18} /> {loading ? "Signing In..." : "Sign In"}
//           </Button>
//         </form>

//         {message && <p className="text-center mt-4">{message}</p>}

//         <p className="text-sm text-center mt-6">
//           Don’t have an account?{" "}
//           <Link href="/signup" className="text-orange-600 font-semibold">
//             Sign Up
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default SignIn;