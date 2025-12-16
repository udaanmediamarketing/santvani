// import { Link } from "react-router-dom";
// import { Button } from "../components/ui/button";
// import { LogIn } from "lucide-react";

// const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];

// const Navbar = () => {
//   return (
//     <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center">
//       <h1 className="text-xl font-bold tracking-wide">🕉️ संतवाणी</h1>

//       <div className="flex gap-3">
//         <Link to="/">
//           <Button variant="secondary" className="text-white hover:bg-gray-100 hover:text-black">
//             मुख्य पान
//           </Button>
//         </Link>

//         {sants.map((sant) => (
//           <Link key={sant} to={`/sant/${sant}`}>
//             <Button variant="ghost" className="text-white hover:bg-white/20">
//               {sant}
//             </Button>
//           </Link>
//         ))}

//         <Link to="/create-article">
//           <Button variant="secondary" className="text-white hover:bg-white/20">
//             लेख तयार करा
//           </Button>
//         </Link>

//         <Link to="/list-articles">
//           <Button variant="secondary" className="text-white hover:bg-white/20">
//             लेखांची यादी
//           </Button>
//         </Link>

//         <Link to="/signin">
//           <Button
//             variant="secondary"
//             className="bg-white text-orange-600 font-semibold hover:bg-gray-100 flex items-center gap-2 transition-all duration-200"
//           >
//             <LogIn size={18} />
//             Sign In
//           </Button>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


"use client";

import Link from "next/link";
import { Button } from "../components/ui/button";
import { LogIn } from "lucide-react";

const sants = ["तुकाराम", "एकनाथ", "नामदेव", "ज्ञानेश्वर"];

const Navbar = () => {
  return (
    <nav className="bg-orange-500 shadow-md text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold tracking-wide">🕉️ संतवाणी</h1>

      <div className="flex gap-3">
        <Link href="/">
          <Button variant="secondary" className="text-white hover:bg-gray-100 hover:text-black">
            मुख्य पान
          </Button>
        </Link>

        {sants.map((sant) => (
          <Link key={sant} href={`/sant/${sant}`}>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              {sant}
            </Button>
          </Link>
        ))}

        <Link href="/create-article">
          <Button variant="secondary" className="text-white hover:bg-white/20">
            लेख तयार करा
          </Button>
        </Link>

        <Link href="/list-articles">
          <Button variant="secondary" className="text-white hover:bg-white/20">
            लेखांची यादी
          </Button>
        </Link>

        <Link href="/signin">
          <Button
            variant="secondary"
            className="bg-white text-orange-600 font-semibold hover:bg-gray-100 flex items-center gap-2 transition-all duration-200"
          >
            <LogIn size={18} />
            Sign In
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;