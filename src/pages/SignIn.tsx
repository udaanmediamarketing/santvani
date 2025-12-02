// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "../components/ui/button";
// import { LogIn } from "lucide-react";
// import { useState } from "react";

// const SignIn = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("✅ Login successful!");
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // 🔥 Redirect based on role
//         setTimeout(() => {
//           if (data.user.role === "admin") {
//             navigate("/adminDashboard");  // Admin Dashboard
//           } else {
//             navigate("/dashboard");        // Normal User Dashboard
//           }
//         }, 1200);
//       } else {
//         setMessage(`❌ ${data.message || "Invalid credentials"}`);
//       }
//     } catch (error) {
//       setMessage("⚠️ Server not responding. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 to-orange-600 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
//           Welcome Back 👋
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
//               required
//             />
//           </div>

//           <Button
//             type="submit"
//             disabled={loading}
//             className={`w-full ${
//               loading ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"
//             } text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200`}
//           >
//             <LogIn size={18} />
//             {loading ? "Signing In..." : "Sign In"}
//           </Button>
//         </form>

//         {message && (
//           <p
//             className={`text-sm text-center mt-4 ${
//               message.startsWith("✅")
//                 ? "text-green-600"
//                 : message.startsWith("❌")
//                 ? "text-red-600"
//                 : "text-yellow-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <p className="text-sm text-center text-gray-600 mt-6">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-orange-600 font-semibold hover:underline"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default SignIn;


// src/pages/SignIn.tsx
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { LogIn } from "lucide-react";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Successful login
        setMessage("✅ Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect based on role
        setTimeout(() => {
          if (data.user.role === "admin") {
            navigate("/adminDashboard");
          } else {
            navigate("/dashboard");
          }
        }, 1200);
      } else {
        // ❌ Handle backend errors
        switch (response.status) {
          case 403:
            if (data.error === "Account pending admin approval") {
              setMessage("⚠️ Your account is pending admin approval. Please wait.");
            }
            break;
          case 401:
            setMessage("❌ Invalid credentials. Please try again.");
            break;
          case 404:
            setMessage("❌ User not found. Please sign up first.");
            break;
          default:
            setMessage(`❌ ${data.error || "Something went wrong"}`);
        }
      }
    } catch (err) {
      console.error("SignIn error:", err);
      setMessage("⚠️ Server not responding. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 to-orange-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"
            } text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200`}
          >
            <LogIn size={18} />
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {message && (
          <p
            className={`text-sm text-center mt-4 ${
              message.startsWith("✅")
                ? "text-green-600"
                : message.startsWith("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignIn;
