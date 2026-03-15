// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Button } from "../components/ui/button";

// export default function ForgotPassword() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex justify-center items-center px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
//       >
//         <motion.h1
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-bold text-center text-orange-500 mb-4"
//         >
//           Forgot Password
//         </motion.h1>

//         <p className="text-gray-600 text-center mb-6 text-sm">
//           Enter your registered email address to receive password reset instructions.
//         </p>

//         <motion.form
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="space-y-5"
//         >
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
//               required
//             />
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition-all duration-300"
//           >
//             Send Reset Link
//           </Button>
//         </motion.form>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="mt-6 text-center"
//         >
//           <Link
//             to="/signin"
//             className="text-orange-500 hover:underline text-sm font-medium"
//           >
//             ← Back to Sign In
//           </Link>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../components/ui/button";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-orange-500 mb-4"
        >
          Forgot Password
        </motion.h1>

        <p className="text-gray-600 text-center mb-6 text-sm">
          Enter your registered email address to receive password reset instructions.
        </p>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition-all duration-300"
          >
            Send Reset Link
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <Link
            href="/signin"
            className="text-orange-500 hover:underline text-sm font-medium"
          >
            ← Back to Sign In
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}